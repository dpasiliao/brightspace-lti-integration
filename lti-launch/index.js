const path = require("path");
require("dotenv").config();

var sslKey =
  process.env.NODE_ENV === "production"
    ? ""
    : "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCwfLQjxD45Ao87\nONV9WxlBt3GG1tvwGRH857esq/UjSa+vGdm6EDtBZloN3d5ZdbOzRhiqKF+5rOt/\nZtnYdVfdHk5pP7EI8JALozF9D8awq179fXWCReaqVlj7cZeguaxlrzi23bEGdcbS\n+ZaUKgYmSnrguRKtcVt/cMATQSS/zKJoBMRXuNTxFto+ONAi9FiqQA4FRKVPSJ9c\nv7rAPCXw7J7G1MHi3N1NF9nbM15yuTYJLYNeHc6DPjBeNcDRpN3kOK+4H3SfS1cU\n3/73UHyUy64fqH4nqNyu5oO7qzm1qfeE8SyKFacPOvZXwy0rX25avhCQcir/LeZc\nXWDyxCf5AgMBAAECggEAWheeoa95EAM1eMbffLl3YCuz4WBnL96sZw0mnxe88MGZ\n1Gn+0lOc3BrSl8eNzN8f18FNr/ciPpd+NDAdvrjQHIlu/51K00RyU+5/wda+18rz\nl7VmuhTS1ltz2w+2lo6R6eqTqg3rY1/WGjbc3k/BieR1a6guV6nJSnoVIv8bMmj7\nzjSMzFJObKfKuKJzDEbTR2rabmD3wuWhHP6ioe8/UjVzS4DC4HdMhUZXqO89cDJe\n6R9pP0Cequ/Mems4Fd3JVy9tCWqrb1OTUCGjTWEy/0oiN7ercbQSnC+05zkgaZPr\nt0uMLvE6hNUeSkYTUz/cF7+PSbZDy16erJNGzGmAHQKBgQDcBXs85C/m+2hhTzgz\n6n6CFB39aGlUWdKO9T7AcFi5mE7m+fWs7Ldr6pMe2hcrzZrOE1VbXkfQSag77zn1\n8udvgQQD9eCSiPm0Ci6vGI+18ZXMixfOhnxU6M9JfuIKh+aW0mEx1u9F2kX3esrx\n3q3YUxIL6mqiDBXWVmBCrvb0YwKBgQDNWMsdbtAQq3ZjMs5al0FPZzOwUy/qnQnd\nHYh+tiLhQEDuydVG1AwbZOY527UlAXM6fOqOgFxwx6KdplVTUjXvNdiXhS8yklnp\nWeo1n5bJQDT9WdA+L06kEbTAl9COV5gx4WgIJf0xV7sVcQD5LuccEwPVQdgkTgFM\nHwrAWIF68wKBgDCjpZLYfx55BaI9eRdBB6aJ+/dBVcen87xWywCP1Y1x9j9pkr4f\ntozM1qlDXUv5r/dOntgMB6QsJFzbjdypTjCAPPsDKBo83bbHaXqb22lFdvA475Jg\neKvsq6Z7vkzFrlw5NfNmqI6wqjcDlknSCGyCMMMhl2EreshfX/hd5YoxAoGBAJqk\nBcJSkyoalfs6ZaBfS/XKGGjvHKSoQqdb+FDERRww0TWClbTTN5Lht2dXB+GoZ+hh\n7hoGnJbqIJJsktE+lhNhD4175QFGqaNL7U8Yses5CS7KFkLeSXDRTLfFHHA1kw3t\nW/TW9wfTs7X/9eWx5qWDxF0zStx8SgnTTrtva4L1AoGAJQoPcKXcaszVGBe/cL6n\nlUnDkrmxb0eKoe7Uwj8RpcvqEcGQxzqcrRrbjAoHFt50+JZwvGCacGwH0QlEBDCw\njufebRKgMznDR25ETSLGdJRgeQhJA3jUDq3wJH5HUdAOZPU01xHC3SzFr75+6TCq\nY+T2P4yChRKytwQKXU+BTEQ=\n-----END PRIVATE KEY-----";

var sslCert =
  process.env.NODE_ENV === "production"
    ? ""
    : "-----BEGIN CERTIFICATE-----\nMIIEBTCCAu2gAwIBAgIUZxF7mwpuQr5CurtdYM+iIAzuFBQwDQYJKoZIhvcNAQEL\nBQAwgZExCzAJBgNVBAYTAkNBMRAwDgYDVQQIDAdPbnRhcmlvMRAwDgYDVQQHDAdU\nb3JvbnRvMRcwFQYDVQQKDA5CcmFua3NvbWUgSGFsbDEMMAoGA1UECwwDRGV2MQ0w\nCwYDVQQDDAREb25uMSgwJgYJKoZIhvcNAQkBFhlkcGFzaWxpYW9AYnJhbmtzb21l\nLm9uLmNhMB4XDTIxMDIxOTE0NTMyNFoXDTIyMDIxOTE0NTMyNFowgZExCzAJBgNV\nBAYTAkNBMRAwDgYDVQQIDAdPbnRhcmlvMRAwDgYDVQQHDAdUb3JvbnRvMRcwFQYD\nVQQKDA5CcmFua3NvbWUgSGFsbDEMMAoGA1UECwwDRGV2MQ0wCwYDVQQDDAREb25u\nMSgwJgYJKoZIhvcNAQkBFhlkcGFzaWxpYW9AYnJhbmtzb21lLm9uLmNhMIIBIjAN\nBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAsHy0I8Q+OQKPOzjVfVsZQbdxhtbb\n8BkR/Oe3rKv1I0mvrxnZuhA7QWZaDd3eWXWzs0YYqihfuazrf2bZ2HVX3R5OaT+x\nCPCQC6MxfQ/GsKte/X11gkXmqlZY+3GXoLmsZa84tt2xBnXG0vmWlCoGJkp64LkS\nrXFbf3DAE0Ekv8yiaATEV7jU8RbaPjjQIvRYqkAOBUSlT0ifXL+6wDwl8OyextTB\n4tzdTRfZ2zNecrk2CS2DXh3Ogz4wXjXA0aTd5DivuB90n0tXFN/+91B8lMuuH6h+\nJ6jcruaDu6s5tan3hPEsihWnDzr2V8MtK19uWr4QkHIq/y3mXF1g8sQn+QIDAQAB\no1MwUTAdBgNVHQ4EFgQUfy/azMPEyFxCuMILmHKYklcX7LYwHwYDVR0jBBgwFoAU\nfy/azMPEyFxCuMILmHKYklcX7LYwDwYDVR0TAQH/BAUwAwEB/zANBgkqhkiG9w0B\nAQsFAAOCAQEATrY+Ct0VIuZ1nRdKPsH8b3sjbIINmA4gYpzI0ObkhRJSUvrUuex+\nvD2zlOmRTrC4quqjccVKifRNjRWT1vTGQvcxYawENUHybW60P3kCzwnPqLAJ4AdB\ntE98Eesg79FVFg79Ja5YwfKvj95j/auSZKmKw5aaikOf3bYn0DHhGV+ovJDnVfN0\nyuOJz7j8CHhDeUwV1i2GuL7DqEsa+Xy1NJ4WkKTpNSQvISlT2zVNIL43Yv55vaJM\nGRczkWS9C+WrzXfj0OxQ0WC3wA3vHzLJ7suDD9VJDWALMNFVUQzok0n9wcyNdI1f\nRCShPe/ZMO6mUzcuG9NXWwSgL6S/3Y9vyg==\n-----END CERTIFICATE-----";

// Require Provider
const lti = require("ltijs").Provider;

// Setup provider
lti.setup(
  process.env.LTI_KEY, // Key used to sign cookies and tokens
  {
    // Database configuration
    url: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster2.bixuy.mongodb.net/ltijs?retryWrites=true&w=majority`,
    connection: {
      user: process.env.MONGO_USER,
      pass: process.env.MONGO_PASSWORD,
    },
  },
  {
    // Options
    appRoute: "/",
    cookies: {
      secure: false, // Set secure to true if the testing platform is in a different domain and https is being used
      sameSite: "None", // Set sameSite to 'None' if the testing platform is in a different domain and https is being used
    },
    https_status: process.env.NODE_ENV === "production" ? false : true,
    ssl: {
      key: sslKey,
      cert: sslCert,
    },
    tokenMaxAge: false,
    devMode: process.env.NODE_ENV === "production" ? false : true, // Set DevMode to false if running in a production environment with https
  }
);

// Set lti launch callback
lti.onConnect((token, req, res) => {
  console.log("it's alive");
  return res.send("It's alive!");
});

const setup = async () => {
  // Deploy server and open connection to the database
  await lti.deploy({ port: 5000 }); // Specifying port. Defaults to 5000

  // Register platform
  await lti.registerPlatform({
    url: process.env.PLATFORM_URL,
    name: process.env.PLATFORM_NAME,
    clientId: process.env.CLIENT_ID,
    authenticationEndpoint: process.env.AUTHENTICATION_ENDPOINT,
    accesstokenEndpoint: process.env.ACCESS_TOKEN_ENDPOINT,
    authConfig: { method: "JWK_SET", key: process.env.AUTH_KEYSET },
  });
};

setup();
