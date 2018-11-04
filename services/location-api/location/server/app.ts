//Core framework
import express = require('express');
import bodyParser = require('body-parser');
import cors = require('cors');

//Entifix framework
import entifix = require('entifix-ts-backend');

//Application
import CityEntity = require('./app/entities/City');
import CountryEntity = require('./app/entities/Country');


class App extends entifix.EntifixApplication 
{

    //#region Properties
    
    //#endregion


    //#region Methods

    protected registerEntities() : void 
    {
        //App Entities
        this.session.registerEntity<CityEntity.ICityModel, CityEntity.City>( CityEntity.City, CityEntity.City.getInfo() );
        this.session.registerEntity<CountryEntity.ICountryModel, CountryEntity.Country>( CountryEntity.Country, CountryEntity.Country.getInfo() );
        
    }


    protected exposeEntities() : void
    {
        //App Entities
        this.routerManager.exposeEntity('City');
        this.routerManager.exposeEntity('Country');
        
    }

    protected validateToken (token: string, request: express.Request) : Promise<{success:boolean, message:string}>
    {
        return this.requestTokenValidationWithCache(token, request);
    }

    //#endregion

    
    //#region Accessors
    
    protected get serviceConfiguration()
    {
        let config : entifix.EntifixAppConfig = {
            serviceName: 'ratings-management-location',
            mongoService: process.env.MONGO_SERVICE || 'localhost:27017/ratings-management-location-db',
            cors: { enable: true },
            protectRoutes: { enable: false },
            devMode: true
        }

        return config;
    }
    
    //#endregion


}

export { App }