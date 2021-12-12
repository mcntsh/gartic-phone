import { Model, DataTypes, UUIDV4, literal } from 'sequelize'
import returnFinder from '../../helpers/returnFinder'
import Guest from '../guest/model'
import { GAME_ROUND_TYPES } from './constants'
import database from '../../database'

class Game extends Model {
  static async findByUUID(uuid = '') {
    const game = await this.findOne({
      where: { uuid },
    })

    return returnFinder(game)
  }

  async start() {
    await this.update({ started: true })
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

class GameGuest extends Model {
  get value() {
    return {
      uuid: this.uuid,
      dateCreated: this.date_created,
    }
  }

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

class GameRound extends Model {
  get value() {
    return {
      uuid: this.uuid,
      type: this.type,
      dateCreated: this.date_created,
    }
  }
}

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

export function init() {
  // Associations

  Game.belongsTo(Guest, {
    as: 'creator',
    foreignKey: 'guest_uuid',
  })
  Game.belongsToMany(Guest, {
    as: 'guests',
    through: GameGuest,
    foreignKey: 'game_uuid',
  })
  Game.hasMany(GameRound, {
    foreignKey: 'game_uuid',
  })

  GameRound.belongsTo(Game)

  // Scopes

  Game.addScope('defaultScope', {
    attributes: [
      'uuid',
      'started',
      'date_created',
      [
        literal(`(
            SELECT uuid
            FROM game_rounds AS game_round
            WHERE game_round.game_uuid = Game.uuid
            ORDER BY game_round.date_created DESC
            LIMIT 1
        )`),
        'round',
      ],
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
    ],
  })

  // Hooks

  Game.addHook('afterCreate', async (game) => {
    const gameRound = await GameRound.create({
      type: GAME_ROUND_TYPES.WRITE,
    })
    await game.addGameRound(gameRound)
  })
}

export { GameRound, GameGuest }
export default Game
