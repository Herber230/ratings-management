//Core framework
import express = require('express');
import bodyParser = require('body-parser');
import cors = require('cors');

//Entifix framework
import entifix = require('entifix-ts-backend');

//Application
import CustomerEntity = require('./app/entities/customer/customer');
import ProgramTypeEntity = require('./app/entities/program/programType');
import EmployeeEntity = require('./app/entities/employee/employee');
import QuestionEntity = require('./app/entities/question/question');
import ProgramQuestionEntity = require('./app/entities/programQuestion/programQuestion');
import ProgramRequirementEntity = require('./app/entities/programRequirement/programRequirement');
import { AppliedRequirement, IAppliedRequirementModel, Requirement, IRequirementModel } from './app/entities/requirement/requirement';
import { Expedient, IExpedientModel} from './app/entities/expedient/expedient';
import GenderEntity = require('./app/entities/fixedCatalog/gender');
import CivilStatusEntity = require('./app/entities/fixedCatalog/civilStatus');


class App extends entifix.EntifixApplication 
{

    //#region Properties
    
    //#endregion


    //#region Methods

    protected registerEntities() : void 
    {
        //App Entities
        this.session.registerEntity<CustomerEntity.ICustomerModel, CustomerEntity.Customer>( CustomerEntity.Customer, CustomerEntity.Customer.getInfo() );
        this.session.registerEntity<ProgramTypeEntity.IProgramTypeModel, ProgramTypeEntity.ProgramType>( ProgramTypeEntity.ProgramType, ProgramTypeEntity.ProgramType.getInfo() );
        this.session.registerEntity<EmployeeEntity.IEmployeeModel, EmployeeEntity.Employee>( EmployeeEntity.Employee, EmployeeEntity.Employee.getInfo() );
        this.session.registerEntity<QuestionEntity.IQuestionModel, QuestionEntity.Question>( QuestionEntity.Question, QuestionEntity.Question.getInfo() );
        this.session.registerEntity<ProgramQuestionEntity.IProgramQuestionModel, ProgramQuestionEntity.ProgramQuestion>( ProgramQuestionEntity.ProgramQuestion, ProgramQuestionEntity.ProgramQuestion.getInfo() );
        this.session.registerEntity<ProgramRequirementEntity.IProgramRequirementModel, ProgramRequirementEntity.ProgramRequirement>( ProgramRequirementEntity.ProgramRequirement, ProgramRequirementEntity.ProgramRequirement.getInfo() );
        this.session.registerEntity<IExpedientModel, Expedient>( Expedient, Expedient.getInfo() );
        this.session.registerEntity<IAppliedRequirementModel, AppliedRequirement>( AppliedRequirement, AppliedRequirement.getInfo() );
        this.session.registerEntity<IRequirementModel, Requirement>( Requirement, Requirement.getInfo() );
        this.session.registerEntity<GenderEntity.IGenderModel, GenderEntity.Gender>( GenderEntity.Gender, GenderEntity.Gender.getInfo() );
        this.session.registerEntity<CivilStatusEntity.ICivilStatusModel, CivilStatusEntity.CivilStatus>( CivilStatusEntity.CivilStatus, CivilStatusEntity.CivilStatus.getInfo() );
    }


    protected exposeEntities() : void
    {
        //App Entities
        this.routerManager.exposeEntity('Expedient');
        this.routerManager.exposeEntity('Customer');
        this.routerManager.exposeEntity('ProgramType');
        this.routerManager.exposeEntity('Employee');
        this.routerManager.exposeEntity('Requirement');
        this.routerManager.exposeEntity('Question');
        this.routerManager.exposeEntity('ProgramQuestion', { resourceName: 'program-question' });
        this.routerManager.exposeEntity('ProgramRequirement', { resourceName: 'program-requirement'});
        this.routerManager.exposeEntity('AppliedRequirement');
        this.routerManager.exposeEntity('Gender');
        this.routerManager.exposeEntity('CivilStatus');
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
            serviceName: 'expedient-management',
            mongoService: process.env.MONGO_SERVICE || 'localhost:27017/expedient-management-db',
            amqpService: process.env.AMQP_SERVICE,
            authCacheService: process.env.AUTH_REDIS_SERVICE,
            cors: { enable: true },
            protectRoutes: { enable: false },
            devMode: true
        }

        return config;
    }
    
    //#endregion


}

export { App }