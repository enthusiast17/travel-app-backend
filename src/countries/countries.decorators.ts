import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsCapitalCoordinates(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isCapitalCoordinates',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          return (
            Array.isArray(value) &&
            value.length === 2 &&
            typeof value[0] === 'number' &&
            typeof value[1] === 'number'
          );
        },
      },
    });
  };
}

export function IsCountryCoordinates(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isCountryCoordinates',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          return (
            Array.isArray(value) &&
            value.length > 0 &&
            Array.isArray(value[0]) &&
            value[0].length > 0 &&
            Array.isArray(value[0][0]) &&
            value.every((pArr: any) =>
              pArr.every(
                (ppArr: any) =>
                  Array.isArray(ppArr) &&
                  ppArr.length === 2 &&
                  typeof ppArr[0] === 'number' &&
                  typeof ppArr[1] === 'number',
              ),
            )
          );
        },
      },
    });
  };
}

export function IsImageUrlList(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isImageUrlList',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          return (
            Array.isArray(value) &&
            value.every((element) => typeof element === 'string')
          );
        },
      },
    });
  };
}
