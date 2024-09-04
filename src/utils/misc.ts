import { TransformFnParams } from 'class-transformer/types/interfaces';
import * as Buffer from 'buffer';

export const lowerCaseTransformer = (
  params: TransformFnParams,
): string | undefined => params.value?.toLowerCase().trim();

export const base64Encode = (inputString: string) => {
  const bufferObj = Buffer.Buffer.from(inputString, 'utf8');
  return bufferObj.toString('base64');
};

export const base64Decode = (inputString: string) => {
  const bufferObj = Buffer.Buffer.from(inputString, 'base64');
  return bufferObj.toString('utf8');
};
