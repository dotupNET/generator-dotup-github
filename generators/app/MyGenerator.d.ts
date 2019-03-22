import { BaseGenerator, GeneratorOptions } from 'dotup-typescript-yeoman-generators';
export declare enum MyGeneratorQuestions {
    yourName = "yourName",
    niceDay = "niceDay"
}
export declare class MyGenerator extends BaseGenerator<MyGeneratorQuestions> {
    constructor(args: string | string[], options: GeneratorOptions<MyGeneratorQuestions>);
    initializing(): Promise<void>;
    prompting(): Promise<void>;
    configuring(): Promise<void>;
    install(): Promise<void>;
    end(): Promise<void>;
}
