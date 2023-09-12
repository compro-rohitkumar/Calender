import Event from "../../Models/Event.model";

export default defineEventHandler(async (event) => {
  return await Event.find();
});
