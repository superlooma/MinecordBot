import {get as getReq} from 'https';
import { IncomingMessage } from 'http';
import { readFileSync, existsSync, writeFileSync } from 'fs';

export class Optional<T> {
	value?: T;
	private constructor(val?: T) {
		this.value = val;
	}

	static Some<T>(value: T): Optional<T> {
		return new Optional(value);
	}

	static None<T>(): Optional<T> {
		return new Optional();
	}

	unwrap(): T {
		if(!this.value)
			throw new UnwrapError("Unwrap called on a None value");
		return this.value;
	}

	unwrap_or(val: T): T {
		if(this.value)
			return this.value;
		return val;
	}

	is_none(): boolean {
		return !this.value
	}

	is_some(): boolean {
		return !!this.value
	}
}

export const Some = Optional.Some;

export const None = Optional.None;

export class Result<O> {
	value?: O;
	err?: string;
	isErr: boolean;
	private constructor(is_err: boolean, val?: O, err_val?: string) {
		this.isErr = is_err;
		this.err  = err_val;
		this.value = val;
	}

	static Err<T>(err: string): Result<T> {
		return new Result(true, <any>undefined, err);
	}

	static Ok<T>(value: T): Result<T> {
  		return new Result(false, value);
	}
	
	unwrap(): O {
		if(!this.value)
			throw new UnwrapError(this.err);
		return this.value;
	}

	unwrap_or(val: O): O {
		if(!this.isErr)
			return <O>this.value;
		return val;
	}

	is_err(): boolean {
		return this.isErr;
	}

	is_ok(): boolean {
		return !this.is_err;
	}
}

export const Ok = Result.Ok;
export const Err = Result.Err;

interface UnwrapError extends Error {
}

interface UnwrapErrorConstructor extends ErrorConstructor {
  new (message?: string): ReferenceError;
  (message?: string): ReferenceError;
  readonly prototype: ReferenceError;
}

declare var UnwrapError: UnwrapErrorConstructor;

export function get(url: string): Promise<string> {
	return new Promise((resolve, reject) => {
		getReq(url, (res: IncomingMessage) => {
			let cache = '';

			res.on('data', (chunk) => cache += chunk);
			res.on('close', () => resolve(cache));
			res.on('error', (err) => reject(err));
		});
	});
}

export function read_file_sync_safe(path: string): string {
	if(!existsSync(path))
		writeFileSync(path, '');
	return readFileSync(path).toString();
}

export function rand_range(min:number, max:number) {
  return Math.random() * (max - min) + min;
}