module.exports = {

        "rootDir": "./",
    
        "testPathIgnorePatterns": [
          "./bower_components/",
          "./node_modules/",
          "./build/"

        ],
        "verbose": true,
        "testEnvironment": "jsdom",
        
       
        
        "setupFilesAfterEnv": [
  
          "./node_modules/jest-enzyme/lib/index.js",
          "./test/setup.js"
        ],
        

        "globals": {
          "__DEV__": true,
          "NODE_ENV": "test",
          "ENDPOINT": "http://localhost:3500",
          "GOOGLE_API_KEY": "key",
          "FIREBASE_AUTH_DOMAIN": "url",
          "MAPBOX_API_TOKEN": "token"
        },

        "unmockedModulePathPatterns": [
          "node_modules/react/",
          "nome_modules/enzyme/"
          
        ],
        "moduleNameMapper": {
          "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/test/__mocks__/fileMock.js",
          "\\.(css|less|scss|sass)$": "<rootDir>/test/__mocks__/styleMock.js"
        }
     

}