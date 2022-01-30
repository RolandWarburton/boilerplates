// References the interface from ../../interfaces/payload.interface.ts

import { JSONSchemaType } from "ajv";
import { IPayload } from "../../interfaces/payload.interface";

const schema: JSONSchemaType<IPayload> = {
  type: "object",
  properties: {
    name: {
      type: "string",
      minLength: 1,
      maxLength: 20,
    },
  },
  required: ["name"],
  additionalProperties: false,
};

export default schema;
