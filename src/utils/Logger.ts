enum LogLevel {
  TRACE = "TRACE",
  DEBUG = "DEBUG",
  INFO = "INFO",
  ERROR = "ERROR",
}

export function log(
  target: Object, // the class with the method being decorated
  propertyKey: string | symbol, // The name of the method being decorated
  descriptor: TypedPropertyDescriptor<any> // contains the method being decorated
): TypedPropertyDescriptor<any> | void {
  const originalMethod = descriptor.value; // Save a reference to the original method

  // Change the method to log its execution time and arguments
  descriptor.value = async function (...args: any[]) {
    const start = performance.now();
    const time = () => `${(performance.now() - start).toFixed(2)}ms`;

    const logMessage = async (type: LogLevel, text: string, showTime = false, data?: Promise<any>) => {
      console.log(
        `[${type}] | ${String(propertyKey)} | ${text} | ${
          showTime ? time() : ""
        }`
      );
      if (data) {
        console.log("Data:", await data);
      }
    };

    try {
      logMessage(LogLevel.INFO, "Entering method.");
      // Call the original method with the provided arguments
      const result = originalMethod.apply(this, args);

      // Handle async
      if (result instanceof Promise) {
        logMessage(LogLevel.INFO, "Result", false, result);
        return result
          .then((res: any) => {
            logMessage(LogLevel.INFO, "Exiting method.", true);
            return res;
          })
          .catch((err: any) => {
            logMessage(LogLevel.ERROR, err.message || err, true);
            throw err;
          });
      }

      logMessage(LogLevel.INFO, "Exiting method.", true);
      return result;
    } catch (error: any) {
      logMessage(LogLevel.ERROR, error.message || error, true);
      throw error;
    }
  };

  return descriptor;
}