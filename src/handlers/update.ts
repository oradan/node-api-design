import prisma from "../db"

export const getAllUpdates = async (req, res) => {
   try {
      const products = await prisma.product.findMany({
         where: {
            authorId: req.user.id
         },
         include: {
            updates: true
         }
      });
      const updates = products.reduce((acc, curr) => {
         const updates = [...acc, ...curr.updates];
         return updates
      }, []);
      res.status(200).json({ data: updates })
   } catch (error) {
      return res.status(400).json({ errorMessage: error })
   }

}

export const getUpdateById = async (req, res) => {
   try {
      const update = await prisma.update.findUnique({
         where: {
            id: req.params.id
         },
         include: {
            updatePoints: true
         }
      })

      res.status(200).json({ data:update })
   } catch (error) {
      return res.status(400).json({ errorMessage: error })
   }
}

export const createUpdate = async (req, res) => {
   try {
      const update = await prisma.update.create({
         data: {
            title:req.body.title,
            body:req.body.body,
            status: req.body.status,
            product: {connect: {id: req.product.id}}
         }
      })

      res.status(200).json({data:update})
   } catch (error) {
      return res.status(400).json({ errorMessage: error })
   }
}


export const updateUpdate = async (req, res) => {
   try {
      const products = await prisma.product.findMany({
         where: {
            authorId: req.user.id
         },
         include: {
            updates: true
         }
      });
      const updates = products.reduce((acc, curr) => {
         const updates = [...acc, ...curr.updates];
         return updates
      }, []);

      const match = updates.find(u => u.id === req.params.id);
      if (!match) {
         return res.status(400).json({ err: "Not authorized to update this resource" })
      }
      const update = await prisma.update.update({
         where: {
            id: req.params.id
         },
         data: req.body
      })

      res.status(200).json({ data: update })
   } catch (error) {
      return res.status(400).json({ errorMessage: error })
   }
}

export const deleteUpdate = async (req, res) => {
   try {
      const products = await prisma.product.findMany({
         where: {
            authorId: req.user.id
         },
         include: {
            updates: true
         }
      });
      const updates = products.reduce((acc, curr) => {
         const updates = [...acc, ...curr.updates];
         return updates
      }, []);

      const match = updates.find(u => u.id === req.params.id);
      if (!match) {
         return res.status(400).json({ err: "Not authorized to update this resource" })
      }
      const deleted = await prisma.update.delete({
         where: {
            id: req.params.id
         }
      })

      res.status(200).json({ data: deleted })
   } catch (error) {
      return res.status(400).json({ errorMessage: error })
   }
}