BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Comentario] (
    [comentarioId] INT NOT NULL IDENTITY(1,1),
    [FKUsuarioId] INT NOT NULL,
    [RecetaIngredienteIdFK] INT NOT NULL,
    [comentario] TEXT,
    [fechaDeCreacion] DATETIME CONSTRAINT [DF__Comentari__fecha__628FA481] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [PK__Comentar__3966EC043C714905] PRIMARY KEY CLUSTERED ([comentarioId])
);

-- CreateTable
CREATE TABLE [dbo].[Imagen] (
    [imagenId] INT NOT NULL IDENTITY(1,1),
    [usuarioFKId] INT NOT NULL,
    [recetaIdFK] INT NOT NULL,
    [pasoIdFK] INT NOT NULL,
    [url] TEXT NOT NULL,
    [tipo] VARCHAR(100) NOT NULL,
    [fechaDeCreacion] DATETIME CONSTRAINT [DF__Imagen__fechaDeC__5CD6CB2B] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [PK__Imagen__494B286B16F8F3A2] PRIMARY KEY CLUSTERED ([imagenId])
);

-- CreateTable
CREATE TABLE [dbo].[Ingrediente] (
    [ingredienteId] INT NOT NULL IDENTITY(1,1),
    [nombre] VARCHAR(150) NOT NULL,
    [cantidad] DECIMAL(6,2),
    [unidad_medida] VARCHAR(20),
    [fechaDeCreacion] DATETIME CONSTRAINT [DF__Ingredien__fecha__5070F446] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [PK__Ingredie__BD695E80D93FC817] PRIMARY KEY CLUSTERED ([ingredienteId])
);

-- CreateTable
CREATE TABLE [dbo].[Paso] (
    [PasoId] INT NOT NULL IDENTITY(1,1),
    [recetaIngredienteIdFK] INT NOT NULL,
    [numeroPaso] INT NOT NULL,
    [descripcion] TEXT NOT NULL,
    CONSTRAINT [PK__Paso__C36D566AEDB1D202] PRIMARY KEY CLUSTERED ([PasoId])
);

-- CreateTable
CREATE TABLE [dbo].[Puntuacion] (
    [puntuacionId] INT NOT NULL IDENTITY(1,1),
    [IdUsuarioFK] INT NOT NULL,
    [RecetaIngredienteFKId] INT NOT NULL,
    [puntuacion] DECIMAL(2,1),
    [fechaDeCreacion] DATETIME CONSTRAINT [DF__Puntuacio__fecha__6754599E] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [PK__Puntuaci__A03018C2699D9C90] PRIMARY KEY CLUSTERED ([puntuacionId])
);

-- CreateTable
CREATE TABLE [dbo].[Receta] (
    [recetaId] INT NOT NULL IDENTITY(1,1),
    [usuarioIdFK] INT NOT NULL,
    [descripcion] TEXT NOT NULL,
    [tiempoPreparacion] TIME NOT NULL,
    [porcion] INT NOT NULL,
    [fechaDeCreacion] DATETIME CONSTRAINT [DF__Receta__fechaDeC__534D60F1] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [PK__Receta__B9B1CB3DD4EEEB7F] PRIMARY KEY CLUSTERED ([recetaId])
);

-- CreateTable
CREATE TABLE [dbo].[RecetaIngrediente] (
    [recetaIngredienteId] INT NOT NULL IDENTITY(1,1),
    [idRecetaFK] INT NOT NULL,
    [idIngredienteFK] INT NOT NULL,
    [fechaDeCreacion] DATETIME CONSTRAINT [DF__RecetaIng__fecha__571DF1D5] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [PK__RecetaIn__F3B157761F8985F1] PRIMARY KEY CLUSTERED ([recetaIngredienteId])
);

-- CreateTable
CREATE TABLE [dbo].[Rol] (
    [rolId] INT NOT NULL IDENTITY(1,1),
    [tipo] VARCHAR(150) NOT NULL,
    [fechaDeCreacion] DATETIME CONSTRAINT [DF__Rol__fechaDeCrea__49C3F6B7] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [PK__Rol__5402363404DC0F4D] PRIMARY KEY CLUSTERED ([rolId])
);

-- CreateTable
CREATE TABLE [dbo].[Usuario] (
    [usuarioId] INT NOT NULL IDENTITY(1,1),
    [rolIdFK] INT NOT NULL,
    [nombreCompleto] VARCHAR(150) NOT NULL,
    [correo] VARCHAR(255) NOT NULL,
    [contraseña] VARCHAR(255) NOT NULL,
    [fechaDeCreacion] DATETIME CONSTRAINT [DF__Usuario__fechaDe__4CA06362] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [PK__Usuario__A5B1AB8E7D9176BF] PRIMARY KEY CLUSTERED ([usuarioId])
);

-- AddForeignKey
ALTER TABLE [dbo].[Comentario] ADD CONSTRAINT [FK__Comentari__FKUsu__6383C8BA] FOREIGN KEY ([FKUsuarioId]) REFERENCES [dbo].[Usuario]([usuarioId]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Comentario] ADD CONSTRAINT [FK__Comentari__Recet__6477ECF3] FOREIGN KEY ([RecetaIngredienteIdFK]) REFERENCES [dbo].[RecetaIngrediente]([recetaIngredienteId]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Imagen] ADD CONSTRAINT [FK__Imagen__pasoIdFK__5FB337D6] FOREIGN KEY ([pasoIdFK]) REFERENCES [dbo].[Paso]([PasoId]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Imagen] ADD CONSTRAINT [FK__Imagen__recetaId__5EBF139D] FOREIGN KEY ([recetaIdFK]) REFERENCES [dbo].[Receta]([recetaId]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Imagen] ADD CONSTRAINT [FK__Imagen__usuarioF__5DCAEF64] FOREIGN KEY ([usuarioFKId]) REFERENCES [dbo].[Usuario]([usuarioId]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Paso] ADD CONSTRAINT [FK__Paso__recetaIngr__59FA5E80] FOREIGN KEY ([recetaIngredienteIdFK]) REFERENCES [dbo].[RecetaIngrediente]([recetaIngredienteId]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Puntuacion] ADD CONSTRAINT [FK__Puntuacio__IdUsu__68487DD7] FOREIGN KEY ([IdUsuarioFK]) REFERENCES [dbo].[Usuario]([usuarioId]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Puntuacion] ADD CONSTRAINT [FK__Puntuacio__Recet__693CA210] FOREIGN KEY ([RecetaIngredienteFKId]) REFERENCES [dbo].[RecetaIngrediente]([recetaIngredienteId]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Receta] ADD CONSTRAINT [FK__Receta__usuarioI__5441852A] FOREIGN KEY ([usuarioIdFK]) REFERENCES [dbo].[Usuario]([usuarioId]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Usuario] ADD CONSTRAINT [FK__Usuario__rolIdFK__4D94879B] FOREIGN KEY ([rolIdFK]) REFERENCES [dbo].[Rol]([rolId]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
