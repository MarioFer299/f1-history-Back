import { IEscuderiaRepository } from '../../domain/repositories/IEscuderiaRepository';

export class GetEscuderiasUseCase {
  constructor(private repository: IEscuderiaRepository) {}

  async execute(page: number = 1, limit: number = 10) {
    const { data, total } = await this.repository.findAll(page, limit);
    
    return {
      data,
      pagination: {
        page,
        limit,
        totalItems: total,
        totalPages: Math.ceil(total / limit),
      }
    };
  }
}
