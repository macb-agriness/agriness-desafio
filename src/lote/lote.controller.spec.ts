import { Test, TestingModule } from "@nestjs/testing";
import { LoteController } from "./lote.controller";
import { LoteService } from "./lote.service";
import { CacheModule } from "@nestjs/cache-manager";

describe('LoteController', () => {

  let controller: LoteController;
  let service: LoteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        CacheModule.register({
          ttl: 5,
          max: 10,
        }),
      ],
      controllers: [LoteController],
      providers: [
        {
          provide: LoteService,
          useValue:{
            create: jest.fn(),
            addAnimal: jest.fn(),
            findById: jest.fn().mockResolvedValue({
              "codigo": 370, "nome": "LOTE-370"
            }),
            findByName: jest.fn(),
            delete: jest.fn().mockResolvedValue({
              "codigo": 370, "nome": "LOTE-370"
            }),
            exists: jest.fn(),
            findLoteAnimal: jest.fn(),
            getAll: jest.fn(),
          }
        }
      ]
    }).compile();

    controller = module.get<LoteController>(LoteController);
    service = module.get<LoteService>(LoteService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('create', () => {

    it('deve criar o lote', async () =>{
      //Act
      const response =
        await controller.create({
          "codigo": 370, "nome": "LOTE-370"
        });

      type LoteResponse = {
        lote: {
          codigo: number,
          nome: string,
          codigoAnimalArray: []
        },
        message: string
      }
      //Expect
      expect(response).toMatchObject<LoteResponse>({
        "lote": {
          "codigo": 370,
          "nome": "LOTE-370",
          "codigoAnimalArray": []
        },
        "message": "lote 'LOTE-370' criado com sucesso!"
      })
    })
  });

  describe('findById', () => {

    it('deve encontrar o lote por ID', async () =>{
      //Act
      await controller.create({"codigo": 370, "nome": 'LOTE-370'});

      expect(controller.findById(370)).toBeDefined();
    })
  });


  describe('delete', () => {

    it('deve excluir o lote', async () =>{

      const result =
        await controller.create({
          "codigo": 370, "nome": "LOTE-370"
        });

      const response = await controller.delete(370);

      type LoteResponse = {
        lote: {
          codigo: number,
          nome: string,
          codigoAnimalArray: []
        },
        message: string
      }
      //Expect
      expect(response).toMatchObject<LoteResponse>({
        "lote": {
          "codigo": 370,
          "nome": "LOTE-370",
          "codigoAnimalArray": []
        },
        "message": "lote 'LOTE-370' excluído com sucesso!"
      })
    })
  });
});

