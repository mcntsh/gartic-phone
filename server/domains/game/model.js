import { Model, DataTypes, UUIDV4, col, literal } from 'sequelize'
import returnFinder from '../../helpers/returnFinder'
import Guest from '../guest/model'
import { GAME_ROUND_TYPES } from './constants'
import database from '../../database'

export default class Game extends Model {
  static async findByUUID(uuid = '') {
    const game = await this.findOne({
      where: { uuid },
    })

    return returnFinder(game)
  }

  async start() {
    await database.transaction(async (transaction) => {
      await this.createGameRound(
        {
          type: GAME_ROUND_TYPES.WRITE,
        },
        { transaction }
      )
      await this.update({ started: true }, { transaction })
    })
  }

  async getLatestRoundForGuest(guest) {
    const [latestRound] = await this.getGameRounds({
      where: {
        '$turns.guest.uuid$': guest.uuid,
      },
      limit: 1,
      order: [[col('turns.date_created'), 'DESC']],
    })

    return returnFinder(latestRound)
  }
}

Game.init(
  {
    uuid: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
    },
    started: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  },
  {
    modelName: 'Game',
    tableName: 'games',
    sequelize: database,
    timestamps: true,
    createdAt: 'date_created',
    updatedAt: false,
  }
)

export class GameGuest extends Model {
  static async createWithCreator(creator) {
    const game = await this.create()
    await game.setCreator(creator)

    return game
  }

  static async findByUUID(uuid = '') {
    const game = await this.findOne({
      where: { uuid },
    })

    return returnFinder(game)
  }
}

GameGuest.init(
  {},
  {
    modelName: 'GameGuest',
    tableName: 'game_guests',
    sequelize: database,
    timestamps: true,
    createdAt: 'date_created',
    updatedAt: false,
  }
)

export class GameRound extends Model {}

GameRound.init(
  {
    uuid: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM,
      values: Object.values(GAME_ROUND_TYPES),
      allowNull: false,
    },
  },
  {
    modelName: 'GameRound',
    tableName: 'game_rounds',
    sequelize: database,
    timestamps: true,
    createdAt: 'date_created',
    updatedAt: false,
  }
)

export class GameTurn extends Model {}

GameTurn.init(
  {
    uuid: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
    },
    value: {
      type: DataTypes.BLOB,
    },
  },
  {
    modelName: 'GameTurn',
    tableName: 'game_turns',
    sequelize: database,
    timestamps: true,
    createdAt: 'date_created',
    updatedAt: false,
  }
)

export function init() {
  // Associations

  Game.hasMany(GameRound, {
    foreignKey: 'game_uuid',
  })
  Game.belongsTo(Guest, {
    as: 'creator',
    foreignKey: 'guest_uuid',
  })
  Game.belongsToMany(Guest, {
    as: 'guests',
    through: GameGuest,
    foreignKey: 'game_uuid',
  })

  GameRound.belongsTo(Game, {
    foreignKey: 'game_uuid',
  })
  GameRound.hasMany(GameTurn, {
    as: 'turns',
    foreignKey: 'round_uuid',
  })

  GameTurn.hasOne(GameTurn, {
    foreignKey: 'uuid',
  })
  GameTurn.belongsTo(GameTurn, {
    foreignKey: 'game_turn_uuid',
    as: 'parent_turn',
  })
  GameTurn.belongsTo(GameRound, {
    foreignKey: 'round_uuid',
  })
  GameTurn.belongsTo(Guest, {
    as: 'guest',
    foreignKey: 'guest_uuid',
  })

  // Scopes

  Game.addScope('defaultScope', {
    attributes: [
      'uuid',
      'started',
      [literal('`GameRounds`.`uuid`'), 'current_round'],
      'date_created',
    ],
    include: [
      {
        model: Guest,
        as: 'creator',
        attributes: ['uuid', 'name'],
      },
      {
        model: Guest,
        as: 'guests',
        through: {
          as: 'game_guests',
          attributes: [],
        },
        attributes: [
          'uuid',
          'name',
          'color',
          [literal('`guests->game_guests`.`date_created`'), 'date_joined'],
        ],
      },
      {
        model: GameRound,
        attributes: [],
      },
    ],

    order: [[literal('`GameRounds`.`date_created`'), 'DESC']],
  })

  GameRound.addScope('defaultScope', {
    attributes: ['uuid', 'type', 'date_created'],
    subQuery: false,
    include: [
      {
        model: GameTurn,
        as: 'turns',
        attributes: ['uuid', 'value', 'date_created'],
        include: [
          {
            model: Guest,
            attributes: [],
            as: 'guest',
          },
          {
            model: GameTurn,
            as: 'parent_turn',
            attributes: ['uuid', 'value', 'date_created'],
          },
        ],
      },
    ],
  })

  // Hooks

  GameRound.addHook('afterFind', (gameRounds) => {
    // This is hacky but I'm sick of fighting with Sequelize
    gameRounds.map((gameRound) => {
      const [latestTurn] = gameRound.dataValues.turns
      gameRound.dataValues.parent_value = latestTurn?.parent_turn?.value ?? null
      delete gameRound.dataValues.turns
    })
  })

  GameRound.addHook('afterSave', async (gameRound, options) => {
    const ops = { transaction: options.transaction }
    const game = await gameRound.getGame({}, ops)

    await Promise.all(
      game.guests.map(async (guest) => {
        const gameTurn = await GameTurn.create({}, ops)
        await gameTurn.setGuest(guest, ops)
        await gameTurn.setGameRound(gameRound, ops)
      })
    )
  })
}
