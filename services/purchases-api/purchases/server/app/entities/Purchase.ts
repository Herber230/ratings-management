import { 
    EMEntity, 
    IBaseEntity, 
    EntityDocument, 
    DefinedEntity,
    DefinedAccessor,
    ExpositionType,  
    EMMemberActivator,
    MemberBindingType,
    EMSession,
    EntityMovementFlow
} from 'entifix-ts-backend';

import { PurchaseRating, IPurchaseRatingModel, IPurchaseRating } from './PurchaseRating';



interface IPurchase extends IBaseEntity
{
    idUser: string,
    total: number,
    currencySymbol: string,
    idStore: string,
    score: number,
    number: number  
    // purchaseRatings : Array<IPurchaseRating>
}

interface IPurchaseModel extends EntityDocument, IPurchase { }

@DefinedEntity( )
class Purchase extends EMEntity implements IPurchase
{
    //#region Properties (Fields)

    private _purchaseRatings : Array<PurchaseRating>;

    //#endregion


    //#region Methods


    onSaving() : Promise<EntityMovementFlow>
    {
        return new Promise<EntityMovementFlow>( (resolve, reject)=>{

            if (this.isNew)
            {
                if(!this.currencySymbol)
                    this.currencySymbol = 'Q';
                    
                let filters =  {
                    $and: [
                            { deferredDeletion: {$in: [null, false]} },
                            { number: { $ne: null } }
                        ] 
                };

                this.session.getModel<IPurchaseModel>('Purchase').findOne().where(filters).sort({number:-1}).exec(
                    (err, doc) =>
                    {
                        if (!err)
                        {
                            if (doc && doc.number)
                                this.number = doc.number+1;
                            else
                                this.number = 1;
                            
                            resolve({continue: true});
                        }
                        else
                            reject(err);                        
                    }
                );
            }
            else
                resolve({continue:true});
        });
    }



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

    @DefinedAccessor({ exposition: ExpositionType.Normal, schema: { type: Number } })
    get total () : number
    { return (<IPurchaseModel>this._document).total; }
    set total (value : number)
    { (<IPurchaseModel>this._document).total = value; }

    @DefinedAccessor({ exposition: ExpositionType.ReadOnly })
    get currencyTotal () : string
    { return `${this.currencySymbol}. ${this.total}`; }

    @DefinedAccessor({ exposition: ExpositionType.Normal, schema: { type: Number } })
    get score () : number
    { return (<IPurchaseModel>this._document).score; }
    set score (value : number)
    { (<IPurchaseModel>this._document).score = value; }

    @DefinedAccessor({ exposition: ExpositionType.Normal, schema: { type: Number } })
    get number () : number
    { return (<IPurchaseModel>this._document).number; }
    set number (value : number)
    { (<IPurchaseModel>this._document).number = value; }

    @DefinedAccessor({ exposition: ExpositionType.ReadOnly })
    get documentNumber () : string
    { return `Purchase #${this.number}`; }


    
    // @DefinedAccessor( { exposition: ExpositionType.Normal, schema: { type: Array },
    //                     activator: new EMMemberActivator<PurchaseRating, IPurchaseRatingModel>(PurchaseRating.getInfo(), MemberBindingType.Snapshot, true ) } )
    // get purchaseRatings () : Array<PurchaseRating>
    // { return this._purchaseRatings; }
    // set purchaseRatings( value : Array<PurchaseRating> )
    // {
    //     this._purchaseRatings = value;

    //     if (value != null)
    //     {
    //         let docs = value.map( v => v.getDocument() as IPurchaseRatingModel );
    //         (this._document as IPurchaseModel).purchaseRatings = docs;
    //     }
    //     else
    //         (this._document as IPurchaseModel).purchaseRatings = null;
    // }


    //#endregion
}

export { Purchase, IPurchaseModel };

