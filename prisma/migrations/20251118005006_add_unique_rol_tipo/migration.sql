/*
  Warnings:

  - A unique constraint covering the columns `[tipo]` on the table `Rol` will be added. If there are existing duplicate values, this will fail.

*/
BEGIN TRY

BEGIN TRAN;

-- CreateIndex
ALTER TABLE [dbo].[Rol] ADD CONSTRAINT [Rol_tipo_key] UNIQUE NONCLUSTERED ([tipo]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
