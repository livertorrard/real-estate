from marshmallow import Schema,fields,validate

class BaseSchema(Schema):
    content = fields.String(validate=validate.Length(min=1,max=50),required=True)

    