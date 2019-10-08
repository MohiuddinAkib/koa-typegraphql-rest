import Koa from 'koa';
import path from 'path';
import config from 'config';
import Router from 'koa-router';
import convert from 'koa-convert';
import { Container } from 'typedi';
import graphqlHTTP from 'koa-graphql';
import { buildSchema } from 'type-graphql';
import { graphqlUploadKoa } from 'graphql-upload';
import queryComplexity, {
  simpleEstimator,
  fieldConfigEstimator
} from 'graphql-query-complexity';
import koaPlayground from 'graphql-playground-middleware-koa';

// Custom imports
// import MeResolver from '@/routes/graphql/resolvers/user/Me';
// import LoginResolver from '@/routes/graphql/resolvers/user/Login';
// import RegisterResolver from '@/routes/graphql/resolvers/user/Register';
import useGraphQLFormatErrorHandler from './useGraphQLFormatErrorHandler';
// import ConfirmUserResolver from '@/routes/graphql/resolvers/user/ConfirmUser';
// import ForgotPasswordResolver from '@/routes/graphql/resolvers/user/ForgotPassword';

const router = new Router();

export default async (app: Koa) => {
  const schema = await buildSchema({
    resolvers: [
      path.resolve(
        process.cwd(),
        config.get('app.srcPath'),
        'routes',
        'graphql',
        'resolvers',
        '**',
        '*.resolver.ts'
      )
    ],
    container: Container,
    validate: true,
    authChecker: ({ context }) => {
      return !!context.session.userId;
    }
  });

  router.all('/playground', koaPlayground({ endpoint: '/graphql' }) as any);

  router.all(
    '/graphql',
    graphqlUploadKoa({ maxFileSize: 10000000, maxFiles: 10 }),
    convert(
      graphqlHTTP(async (request, response, { variables }) => ({
        schema,
        graphiql: true,
        formatError: useGraphQLFormatErrorHandler,
        validationRules: [
          queryComplexity({
            maximumComplexity: config.get('app.graphql.queryComplexity'),
            variables,
            onComplete: (complexity: number) => {
              console.log('Query Complexity:', complexity);
            },
            estimators: [
              fieldConfigEstimator(),
              simpleEstimator({ defaultComplexity: 1 })
            ]
          }) as any
        ]
      }))
    )
  );

  app.use(router.routes()).use(router.allowedMethods());
};
