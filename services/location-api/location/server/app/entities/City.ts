import { 
    EMEntity, 
    IBaseEntity, 
    EntityDocument, 
    DefinedEntity,
    DefinedAccessor,
    ExpositionType  
} from 'entifix-ts-backend';

interface ICity extends IBaseEntity
{
    name: string,
    zipCode: string
}

interface ICityModel extends EntityDocument, ICity { }

@DefinedEntity( )
class City extends EMEntity implements ICity
{
    //#region Properties (Fields)

    //#endregion


    //#region Methods

    //#endregion


    //#region Accessors (Properties)

    @DefinedAccessor({ exposition: ExpositionType.Normal, schema: { type: String } })
    get name () : string
    { return (<ICityModel>this._document).name; }
    set name (value : string)
    { (<ICityModel>this._document).name = value; }

    @DefinedAccessor({ exposition: ExpositionType.Normal, schema: { type: String } })
    get zipCode () : string
    { return (<ICityModel>this._document).zipCode; }
    set zipCode (value : string)
    { (<ICityModel>this._document).zipCode = value; }

    //#endregion
}

export { City, ICityModel, ICity };

