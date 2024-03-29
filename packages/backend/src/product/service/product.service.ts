import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { FileUpload } from 'graphql-upload';
import { Schema } from "mongoose";
import { ImageService } from "../../image/service/image.service";
import { Product } from "../domain/product.model";
import { DeleteProductInput } from "../dto/DeleteProduct.input";
import { FindProductInput } from "../dto/FindProduct.input";
import { UpdateProductInput } from "../dto/UpdateProduct.input";
import { ProductRepository } from "../repository/product.repository";
@Injectable()
export class ProductService {
	constructor(private ProductRepository: ProductRepository,
		private imageService: ImageService
	) { }

	async createProduct(name: string, enName?: string, description?: string, imageUpload?: FileUpload, inventoryIds?: Schema.Types.ObjectId[]) {
		const image = imageUpload ?
			await this.imageService.createImage({ fileUpload: imageUpload, fileName: enName, title: enName, directory:"/product/" })
			: null
		return await this.ProductRepository.create(name, enName, description, image?.url, inventoryIds)
	}

	async findProduct({ _id, name, enName }: FindProductInput) {
		return await this.ProductRepository.find(_id, name, enName)
	}
	
	async updateProduct({ _id, name, enName, ProductIds }: UpdateProductInput) {
		return await this.ProductRepository.update(_id, name, enName, ProductIds)
	}

	async deleteProduct({ _id }: DeleteProductInput) {
		const found = await this.ProductRepository.findById(_id)
		if (!found) throw new NotFoundException("Not found Product with this id: " + _id)
		
		// 'images/product/'
		
		if (found instanceof Product
			&& found.inventoryIds.length > 0)
			throw new BadRequestException("You should remove inventories first")
		
		return await this.ProductRepository.delete(_id)
	}
}