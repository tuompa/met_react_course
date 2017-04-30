function errorMiddleware({ getState, }) {
  return next => action => {
    try {
      return next(action);
    } catch (error) {
      const state = getState();
      const log = { error, state, };
      //Airbreak, google exception tracking tools (slack);
      //github netflix redux-airbreak
      //redux-tap ???
      console.error(JSON.stringify(log, null, 1));
    }
  };
}
export default errorMiddleware;