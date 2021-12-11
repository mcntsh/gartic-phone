import { Model, DataTypes, UUIDV4 } from 'sequelize'
import returnFinder from '../../helpers/returnFinder'
import Game, { GameGuest } from '../game/model'
import database from '../../database'

class Guest extends Model {
  static async findByAuth({ uuid = '', token = '' }) {
    const guest = await this.findOne({
      where: { uuid, token },
    })

    return returnFinder(guest)
  }
}

Guest.init(
  {
    uuid: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
    },
    token: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    modelName: 'Guest',
    tableName: 'guests',
    sequelize: database,
    timestamps: true,
    createdAt: 'date_created',
    updatedAt: false,
  }
)

export function init() {
  // Associations

  Guest.hasMany(Game, {
    foreignKey: 'guest_uuid',
  })
  Guest.belongsToMany(Game, {
    through: GameGuest,
    foreignKey: 'guest_uuid',
  })

  // Scopes

  Guest.addScope('defaultScope', {
    attributes: ['uuid', 'name', 'date_created'],
  })

  // Hooks

  Guest.addHook('afterCreate', async (guest) => {
    await guest.reload() // Apply the default scope to the creation method
  })
}

export default Guest
