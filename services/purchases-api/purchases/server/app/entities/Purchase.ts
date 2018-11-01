import { 
    EMEntity, 
    IBaseEntity, 
    EntityDocument, 
    DefinedEntity,
    DefinedAccessor,
    ExpositionType  
} from 'entifix-ts-backend';

interface IPurchase extends IBaseEntity
{
    idClient: string,
    total: number,
    currencySymbol: string,
    idStore: string    
}

interface IPurchaseModel extends EntityDocument, IPurchase { }

@DefinedEntity( )
class Purchase extends EMEntity implements IPurchase
{
    //#region Properties (Fields)

    //#endregion


    //#region Methods

    //#endregion


    //#region Accessors (Properties)

    @DefinedAccessor({ exposition: ExpositionType.Normal, schema: { type: String } })
    get idClient () : string
    { return (<IPurchaseModel>this._document).idClient; }
    set idClient (value : string)
    { (<IPurchaseModel>this._document).idClient = value; }

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

    //#endregion
}

export { Purchase, IPurchaseModel };

