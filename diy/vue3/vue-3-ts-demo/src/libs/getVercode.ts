const getVerCode = (
  phoneNumber: string | number | undefined,
  mode: string,
  params: any = {}
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const status = Math.random() * 10;
    if (status > 5) {
      resolve("200");
    } else {
      reject("");
    }
  });
};

export default getVerCode;

// getVerCode(1581050531, 'login')
