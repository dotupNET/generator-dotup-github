"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotup_typescript_yeoman_generators_1 = require("dotup-typescript-yeoman-generators");
var MyGeneratorQuestions;
(function (MyGeneratorQuestions) {
    MyGeneratorQuestions["yourName"] = "yourName";
    MyGeneratorQuestions["niceDay"] = "niceDay";
})(MyGeneratorQuestions = exports.MyGeneratorQuestions || (exports.MyGeneratorQuestions = {}));
class MyGenerator extends dotup_typescript_yeoman_generators_1.BaseGenerator {
    constructor(args, options) {
        super(args, options);
        super.registerMethod(this);
        this.destinationRoot(this.destinationPath('tmp'));
        this.writeOptionsToAnswers(MyGeneratorQuestions);
    }
    async initializing() {
        // Your name
        this.addQuestion(new dotup_typescript_yeoman_generators_1.StoreQuestion(MyGeneratorQuestions.yourName, {
            message: `What's your name?`,
            type: dotup_typescript_yeoman_generators_1.InquirerQuestionType.input,
            validate: (v) => this.validateString(v)
        }));
        // How was your day?
        this.addQuestion(new dotup_typescript_yeoman_generators_1.ConfirmQuestion(MyGeneratorQuestions.niceDay, 'Had a nice day. You too?', false));
    }
    async prompting() {
        await super.prompting();
    }
    async configuring() {
        if (this.answers.niceDay) {
            this.logGreen(`Okay ${this.answers.yourName}. Nice day.`);
        }
        else {
            this.logGreen(`Well ${this.answers.yourName}, not a nice day.`);
        }
    }
    async install() {
    }
    async end() {
    }
}
exports.MyGenerator = MyGenerator;

//# sourceMappingURL=MyGenerator.js.map
