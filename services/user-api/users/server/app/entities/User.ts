import { 
    EMEntity, 
    IBaseEntity, 
    EntityDocument, 
    DefinedEntity,
    DefinedAccessor,
    ExpositionType  
} from 'entifix-ts-backend';

interface IUser extends IBaseEntity
{
    userName: string,
    firstName: string,
    lastName: string,
    email: string    
}

interface IUserModel extends EntityDocument, IUser { }

@DefinedEntity( )
class User extends EMEntity implements IUser
{
    //#region Properties (Fields)

    //#endregion


    //#region Methods

    //#endregion


    //#region Accessors (Properties)

    @DefinedAccessor({ exposition: ExpositionType.Normal, schema: { type: String } })
    get userName () : string
    { return (<IUserModel>this._document).userName; }
    set userName (value : string)
    { (<IUserModel>this._document).userName = value; }

    @DefinedAccessor({ exposition: ExpositionType.Normal, schema: { type: String } })
    get firstName () : string
    { return (<IUserModel>this._document).firstName; }
    set firstName (value : string)
    { (<IUserModel>this._document).firstName = value; }

    @DefinedAccessor({ exposition: ExpositionType.Normal, schema: { type: String } })
    get lastName () : string
    { return (<IUserModel>this._document).lastName; }
    set lastName (value : string)
    { (<IUserModel>this._document).lastName = value; }

    @DefinedAccessor({ exposition: ExpositionType.Normal, schema: { type: String } })
    get email () : string
    { return (<IUserModel>this._document).email; }
    set email (value : string)
    { (<IUserModel>this._document).email = value; }

    @DefinedAccessor({ exposition: ExpositionType.ReadOnly })
    get completeName () : string
    { return `${this.firstName} ${this.lastName}`; }

    //#endregion
}

export { User, IUserModel };

