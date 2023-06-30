import { ObjectId } from "mongo";
import { Event } from "../types.ts";

export type EventSchema  = Event & {_id: ObjectId}