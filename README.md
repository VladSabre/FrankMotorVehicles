# Frank Motor Vehicles App

### Development build

#### Backend
* It utilizes IIS Express and your local SQL Server, so make sure you have them installed.
* Make sure you have a connections string to your SQL server defined for the `DefaultConnection` property in `FrankMotorVehicles.API\appsettings.Development.json`
* Open `FrankMotorVehicles.sln` and run it in VS
* By default you'll be able to access the API via https://localhost:44319/ (the url and ports are defined in `FrankMotorVehicles.API\Properties\launchSettings.json`)
* https://localhost:44319/api/vehicle will show you all of the vehicles (w/o any pagination at the moment)
* https://localhost:44319/api/vehicle/5 will provide for you an additional info about a vehicle with id 5

#### Frontend
* To build the UI you'll need npm installed
* Specify backend url in the .env file (https://localhost:44319/ by default)
* Go to fmv-client folder and run `npm install` and then `npm run start`
* The app will be available via http://localhost:3000/ (3000 is the default port, you can change it in the .env file)
* To run the tests execute `npm test`