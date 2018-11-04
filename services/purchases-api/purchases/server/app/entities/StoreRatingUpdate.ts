import { 
    EMEntity, 
    IBaseEntity, 
    EntityDocument, 
    DefinedEntity,
    DefinedAccessor,
    ExpositionType  
} from 'entifix-ts-backend';

interface IStoreRatingUpdate extends IBaseEntity
{
    idStore: string,
    ratingScore: number,
    ratingCount: number
}

interface IStoreRatingUpdateModel extends EntityDocument, IStoreRatingUpdate { }

@DefinedEntity( )
class StoreRatingUpdate extends EMEntity implements IStoreRatingUpdate
{
    //#region Properties (Fields)

    //#endregion


    //#region Methods

    //#endregion


    //#region Accessors (Properties)

    @DefinedAccessor({ exposition: ExpositionType.Normal, schema: { type: String } })
    get idStore () : string
    { return (<IStoreRatingUpdateModel>this._document).idStore; }
    set idStore (value : string)
    { (<IStoreRatingUpdateModel>this._document).idStore = value; }

    @DefinedAccessor({ exposition: ExpositionType.Normal, schema: { type: Number } })
    get ratingScore () : number
    { return (<IStoreRatingUpdateModel>this._document).ratingScore; }
    set ratingScore (value : number)
    { (<IStoreRatingUpdateModel>this._document).ratingScore = value; }

    @DefinedAccessor({ exposition: ExpositionType.Normal, schema: { type: Number } })
    get ratingCount () : number
    { return (<IStoreRatingUpdateModel>this._document).ratingCount; }
    set ratingCount (value : number)
    { (<IStoreRatingUpdateModel>this._document).ratingCount = value; }


    //#endregion
}

export { StoreRatingUpdate, IStoreRatingUpdateModel };

