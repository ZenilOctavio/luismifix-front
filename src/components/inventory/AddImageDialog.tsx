import { Product } from "@/types/products/Product";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogHeader } from "../ui/dialog";
import { getImageService } from "@/services/images/getImageService";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { loadImageFromBuffer } from "@/lib/loadImageFromBuffer";
import { Button } from "../ui/button";
import { useAuth } from "@/providers/AuthProvider";
import { uploadImageService } from "@/services/images/uploadImage";
import { toast } from "../ui/use-toast";

interface AddImageDialogProps {
  open: boolean
  onOpenChange: (open?: boolean) => void
  product: Product
}

export function AddImageDialog({ open, onOpenChange, product }: AddImageDialogProps) {

  const [imagesUrls, setImagesUrls] = useState<string[]>([])
  const [newImage, setImage] = useState<File | null>(null)
  const { user } = useAuth()

  const fetchImages = () => {
    getImageService(product._id)
      .then(data => {

        data.forEach(imageResponse => {
          const url = loadImageFromBuffer(imageResponse.productImage.data)
          console.log(url)
          setImagesUrls([...imagesUrls, url])
        })
      })
  }

  useEffect(() => {
    fetchImages()
  }, [])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!newImage) return;

    uploadImageService(newImage, product._id, user!._id)
      .then(() => {
        fetchImages()
        onOpenChange(false)
        toast({ title: 'La imagen fue subida exitosamente' })
      })
      .catch(error => {
        toast({ title: 'No se pudo subir la imagen', variant: 'destructive' })
        console.log(error)
      })

  }


  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Subir Imagen</DialogTitle>
          <DialogDescription>Selecciona una imagen de tu dispositivo para subirla al producto</DialogDescription>
        </DialogHeader>
        <main className="flex items-center gap-4">
          <aside className="basis-1/2 p-2 flex flex-col gap-2 overflow-y-scroll">
            {
              imagesUrls.length &&
              imagesUrls.map((imageUrl) => {
                return (
                  <figure>
                    <img src={imageUrl} />
                  </figure>
                )
              })
            }
          </aside>

          <form onSubmit={handleSubmit} className="flex flex-col h-full justify-between">
            <Input onChange={handleFileChange} type="file" accept="image/*" placeholder="Selecciona una imagen" className="cursor-pointer" />
            <Button type="submit" disabled={newImage == null}>Subir</Button>
          </form>
        </main>

      </DialogContent>
    </Dialog>
  )
}