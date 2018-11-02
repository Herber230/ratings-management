import { 
    EMEntity, 
    IBaseEntity, 
    EntityDocument, 
    DefinedEntity,
    DefinedAccessor,
    ExpositionType,  
    EMMemberActivator,
    MemberBindingType,
    EMSession
} from 'entifix-ts-backend';

import { PurchaseRating, IPurchaseRatingModel, IPurchaseRating } from './PurchaseRating';



interface IPurchase extends IBaseEntity
{
    idUser: string,
    total: number,
    currencySymbol: string,
    idStore: string,   
    purchaseRatings : Array<IPurchaseRating>
}

interface IPurchaseModel extends EntityDocument, IPurchase { }

@DefinedEntity( )
class Purchase extends EMEntity implements IPurchase
{
    //#region Properties (Fields)

    private _purchaseRatings : Array<PurchaseRating>;

    //#endregion


    //#region Methods

    //#endregion


    //#region Accessors (Properties)

    @DefinedAccessor({ exposition: ExpositionType.Normal, schema: { type: String } })
    get idUser () : string
    { return (<IPurchaseModel>this._document).idUser; }
    set idUser (value : string)
    { (<IPurchaseModel>this._document).idUser = value; }

    @DefinedAccessor({ exposition: ExpositionType.Normal, schema: { type: String } })
    get idStore () : string
    { return (<IPurchaseModel>this._document).idStore; }
    set idStore (value : string)
    { (<IPurchaseModel>this._document).idStore = value; }

    @DefinedAccessor({ exposition: ExpositionType.Normal, schema: { type: String } })
    get currencySymbol () : string
    { return (<IPurchaseModel>this._document).currencySymbol; }
    set currencySymbol (value : string)
    { (<IPurchaseModel>this._document).currencySymbol = value; }

    @DefinedAccessor({ exposition: ExpositionType.Normal, schema: { type: String } })
    get total () : number
    { return (<IPurchaseModel>this._document).total; }
    set total (value : number)
    { (<IPurchaseModel>this._document).total = value; }

    @DefinedAccessor({ exposition: ExpositionType.ReadOnly })
    get currencyTotal () : string
    { return `${this.currencySymbol} . ${this.total}`; }


    @DefinedAccessor( { exposition: ExpositionType.Normal, schema: { type: Array },
                        activator: new EMMemberActivator<PurchaseRating, IPurchaseRatingModel>(PurchaseRating.getInfo(), MemberBindingType.Snapshot, true ) } )
    get purchaseRatings () : Array<PurchaseRating>
    { return this._purchaseRatings; }
    set purchaseRatings( value : Array<PurchaseRating> )
    {
        this._purchaseRatings = value;

        if (value != null)
        {
            let docs = value.map( v => v.getDocument() as IPurchaseRatingModel );
            (this._document as IPurchaseModel).purchaseRatings = docs;
        }
        else
            (this._document as IPurchaseModel).purchaseRatings = null;
    }


    //#endregion
}

export { Purchase, IPurchaseModel };

