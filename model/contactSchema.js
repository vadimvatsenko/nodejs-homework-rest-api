const {Schema, model} = require("mongoose");
const { handleMongooseError } = require('../helpers');
const Joi = require('joi')
const {phonePattern, emailPattern} = require("../pattern")


const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
      match: emailPattern,
      required: true
    },
    phone: {
      type: String,
      match: phonePattern, 
      required: true
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true
    }
  }, { versionKey: false, timestamps: true }
  // когда создан и обновлён контакт, также убирает версию файла
);

contactSchema.post("save", handleMongooseError);

const addJoiSchema = Joi.object({
  name: Joi.string().min(4).max(50).required(),
  email: Joi.string().min(4).max(50).required().pattern(emailPattern),
  phone: Joi.string().min(4).max(50).required().pattern(phonePattern),
  favorite: Joi.boolean(),

});

const updateFovoriteJoiSchema = Joi.object({
  favorite: Joi.boolean().required()
});


const schemas = {
  addJoiSchema,
  updateFovoriteJoiSchema
}
// может быть несколько схем, потому обьеденяем в один обьект

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  schemas
};
