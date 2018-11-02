import { 
    EMEntity, 
    IBaseEntity, 
    EntityDocument, 
    DefinedEntity,
    DefinedAccessor,
    ExpositionType  
} from 'entifix-ts-backend';

interface IPurchaseRating extends IBaseEntity
{
    idRating: string,
    score: number    
}

interface IPurchaseRatingModel extends EntityDocument, IPurchaseRating { }

@DefinedEntity( )
class PurchaseRating extends EMEntity implements IPurchaseRating
{
    //#region Properties (Fields)

    //#endregion


    //#region Methods

    //#endregion


    //#region Accessors (Properties)

    @DefinedAccessor({ exposition: ExpositionType.Normal, schema: { type: String } })
    get idRating () : string
    { return (<IPurchaseRatingModel>this._document).idRating; }
    set idRating (value : string)
    { (<IPurchaseRatingModel>this._document).idRating = value; }

    @DefinedAccessor({ exposition: ExpositionType.Normal, schema: { type: String } })
    get score () : number
    { return (<IPurchaseRatingModel>this._document).score; }
    set score (value : number)
    { (<IPurchaseRatingModel>this._document).score = value; }


    //#endregion
}

export { PurchaseRating, IPurchaseRatingModel, IPurchaseRating };

