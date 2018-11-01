import { 
    EMEntity, 
    IBaseEntity, 
    EntityDocument, 
    DefinedEntity,
    DefinedAccessor,
    ExpositionType,
    EMMemberActivator,
    MemberBindingType  
} from 'entifix-ts-backend';

import { City, ICityModel, ICity } from './City';

interface ICountry extends IBaseEntity
{
    name: string,
    shortName: string,
    cities: Array<ICity>
}

interface ICountryModel extends EntityDocument, ICountry { }

@DefinedEntity( )
class Country extends EMEntity implements ICountry
{
    //#region Properties (Fields)

    private _cities : Array<City>;

    //#endregion


    //#region Methods

    //#endregion


    //#region Accessors (Properties)


    @DefinedAccessor({ exposition: ExpositionType.Normal, schema: { type: String } })
    get name () : string
    { return (<ICountryModel>this._document).name; }
    set name (value : string)
    { (<ICountryModel>this._document).name = value; }


    @DefinedAccessor({ exposition: ExpositionType.Normal, schema: { type: String } })
    get shortName () : string
    { return (<ICountryModel>this._document).shortName; }
    set shortName (value : string)
    { (<ICountryModel>this._document).shortName = value; }

    
    @DefinedAccessor( { exposition: ExpositionType.Normal, schema: { type: Array},
                        activator: new EMMemberActivator<City, ICityModel>(City.getInfo(), MemberBindingType.Snapshot, true) } )
    get cities () : Array<City>
    { return this._cities; }
    set cities ( value : Array<City>)
    {
        this._cities = value;
        if (value != null)
        {
            let docs = value.map( v => v.getDocument() as ICityModel );
            (this._document as ICountryModel).cities = docs;
        }
        else
            (this._document as ICountryModel).cities = null;
    }


    //#endregion
}

export { Country, ICountryModel };

