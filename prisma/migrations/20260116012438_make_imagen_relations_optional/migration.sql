BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[Imagen] DROP CONSTRAINT [FK__Imagen__pasoIdFK__5FB337D6];

-- DropForeignKey
ALTER TABLE [dbo].[Imagen] DROP CONSTRAINT [FK__Imagen__recetaId__5EBF139D];

-- DropForeignKey
ALTER TABLE [dbo].[Imagen] DROP CONSTRAINT [FK__Imagen__usuarioF__5DCAEF64];

-- AlterTable
ALTER TABLE [dbo].[Imagen] ALTER COLUMN [usuarioFKId] INT NULL;
ALTER TABLE [dbo].[Imagen] ALTER COLUMN [recetaIdFK] INT NULL;
ALTER TABLE [dbo].[Imagen] ALTER COLUMN [pasoIdFK] INT NULL;

-- AddForeignKey
ALTER TABLE [dbo].[Imagen] ADD CONSTRAINT [FK__Imagen__pasoIdFK__5FB337D6] FOREIGN KEY ([pasoIdFK]) REFERENCES [dbo].[Paso]([PasoId]) ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Imagen] ADD CONSTRAINT [FK__Imagen__recetaId__5EBF139D] FOREIGN KEY ([recetaIdFK]) REFERENCES [dbo].[Receta]([recetaId]) ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Imagen] ADD CONSTRAINT [FK__Imagen__usuarioF__5DCAEF64] FOREIGN KEY ([usuarioFKId]) REFERENCES [dbo].[Usuario]([usuarioId]) ON DELETE SET NULL ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
