/*
  Warnings:

  - A unique constraint covering the columns `[idRecetaFK,idIngredienteFK]` on the table `RecetaIngrediente` will be added. If there are existing duplicate values, this will fail.

*/
BEGIN TRY

BEGIN TRAN;

-- CreateIndex
ALTER TABLE [dbo].[RecetaIngrediente] ADD CONSTRAINT [RecetaIngrediente_idRecetaFK_idIngredienteFK_key] UNIQUE NONCLUSTERED ([idRecetaFK], [idIngredienteFK]);

-- AddForeignKey
ALTER TABLE [dbo].[RecetaIngrediente] ADD CONSTRAINT [RecetaIngrediente_idRecetaFK_fkey] FOREIGN KEY ([idRecetaFK]) REFERENCES [dbo].[Receta]([recetaId]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[RecetaIngrediente] ADD CONSTRAINT [RecetaIngrediente_idIngredienteFK_fkey] FOREIGN KEY ([idIngredienteFK]) REFERENCES [dbo].[Ingrediente]([ingredienteId]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
