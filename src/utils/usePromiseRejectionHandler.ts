export default () => {
  process.on('unhandledRejection', exception => {
    throw exception;
  });
};
