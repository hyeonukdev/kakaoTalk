import { DataTypes } from "sequelize";

const Chat = sequelize.define("chat", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  content: DataTypes.STRING,
  senderId: {
    type: DataTypes.UUID,
    refrenced: {
      model: User,
    },
  },
  roomId: {
    type: DataTypes.INTEGER,
    refrenced: {
      model: Room,
    },
  },
});

export default Chat;
