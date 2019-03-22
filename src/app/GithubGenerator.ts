import { GithubApiClient } from 'dotup-ts-github-api';
import { Nested, TypeSaveProperty } from 'dotup-ts-types';
import { BaseGenerator, InquirerQuestionType, IProperty, Question, StoreQuestion } from 'dotup-typescript-yeoman-generators';
import { GithubQuestions } from './GithubQuestions';

type PartialQuestions = Partial<TypeSaveProperty<Nested<GithubQuestions, string>>>;

// Or export default!!
export class GithubGenerator extends BaseGenerator<GithubQuestions> {

  private repositoryExists: boolean;

  constructor(args: string | string[], options: Partial<TypeSaveProperty<Nested<GithubQuestions, string>>>) {
    super(args, options);
    this.registerMethod(this);

    this.writeOptionsToAnswers(GithubQuestions);
  }

  async initializing(): Promise<void> {
    if (this.skipGenerator) { return; }

    const opt = <PartialQuestions>this.options;

    this.addQuestion(
      new StoreQuestion(GithubQuestions.githubUserName, {
        message: 'Enter your name',
        default: opt.githubUserName,
        type: InquirerQuestionType.input,
        When: x => opt.userName === undefined
      })
    );

    this.addQuestion(
      new StoreQuestion(GithubQuestions.githubUserName, {
        message: 'Enter your github user name',
        default: opt.githubUserName,
        type: InquirerQuestionType.input,
        When: x => opt.githubUserName === undefined
      })
    );

    this.addQuestion(
      new Question(GithubQuestions.password, {
        message: 'Enter your password',
        description: 'Github password',
        type: InquirerQuestionType.password
      })
    );

    this.addQuestion(
      new Question(GithubQuestions.repositoryName, {
        type: InquirerQuestionType.input,
        message: 'Enter repository name',
        description: 'Repository name',
        When: x => opt.repositoryName === undefined
      })
    );

  }

  async configuring(): Promise<void> {
    if (this.skipGenerator) { return; }

    // If the repository exist, we do nothing
    const git = new GithubApiClient(this.answers.githubUserName, this.answers.password);
    this.repositoryExists = await git.ownRepositoryExists(this.answers.repositoryName);

    // Set remote origin url
    this.answers.githubUrl = git.getRepositoryUrl(this.answers.repositoryName);

    if (this.repositoryExists) {
      // Repo already exitst
      this.logYellow(`Github repository '${this.answers.repositoryName}' already exists.`);
    } else {

      // Create the repository
      const result = await git.createRepository({
        name: this.answers.repositoryName,
        private: false
      });

      const message = `statusCode: ${result.message.statusCode} | statusMessage: ${result.message.statusMessage}`;
      if (result.message.statusCode === 201) {
        this.logGreen(message);
      } else {
        this.logRed(`${message}. Could not create github repository.`);
      }
    }

  }

  // tslint:disable-next-line: no-reserved-keywords
  // async default(): Promise<void> {}
  // async writing(): Promise<void> {  }

  async install(): Promise<void> {
    if (this.skipGenerator) { return; }
  }

  async end(): Promise<void> {
    if (this.skipGenerator) { return; }

    const git = new GithubApiClient(this.answers.githubUserName, this.answers.password);
    const url = git.getRepositoryUrl(this.answers.repositoryName);

    this.spawnCommandSync('git', ['remote', 'add', 'origin', url], {
      cwd: this.destinationPath()
    });
  }

}
