import { Injectable } from '@nestjs/common';
import { CreateVagasDto } from './dto/create-vagas.dto';
import { UpdateVagasDto } from './dto/update-vagas.dto';
import { Vaga } from './entities/vagas.entity';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  orderBy,
  OrderByDirection,
  getDocs,
  setDoc,
  deleteDoc,
  updateDoc,
  Timestamp,
  query
} from 'firebase/firestore';
import { CONSTANTES } from '../common/constantes';
import { firestore } from '../firebaseConfig';

@Injectable()
export class VagasService {
  async create(createVagasDto: any) {
    try {
      const userCollectionRef = collection(
        firestore,
        CONSTANTES.FB_VAGAS_COLLECTION,
      );

      createVagasDto.dataCadastro = Timestamp.now();

      const { uf, cidade, codMunicipio, bairro, cargo, ...rest } = createVagasDto;

      createVagasDto = {
        ...rest,
        cargo: { // Mantém o formato de objeto para o cargo
          id: cargo.id,
          descricao: cargo.descricao,
        },

        endereco: {
          uf,
          cidade,
          codMunicipio,
          bairro,
        }
      };

      const docRef = await addDoc(userCollectionRef, createVagasDto);

      await updateDoc(
        doc(firestore, CONSTANTES.FB_VAGAS_COLLECTION, docRef.id),
        { id: docRef.id },
      );

      return { id: docRef.id };
    } catch (error) {
      console.log(error);
      throw new Error('Erro ao criar a vaga');
    }
  }


  async findAll() {
    const vagas: Vaga[] = [];

    try {
      const docRef = await getDocs(
        query(
          collection(firestore, CONSTANTES.FB_VAGAS_COLLECTION),
          orderBy(
            CONSTANTES.SORT_DATA_CADASTRO,
            CONSTANTES.SORT_DECRESCENTE as OrderByDirection
          )
        )
      );

      docRef.docs.forEach((doc) => {
        const vaga = Vaga.empty();

        vaga.setId(doc.id);
        const data = doc.data();

        vaga.setCargo(data.cargo ?? CONSTANTES.VAZIO);

        vaga.setCargo({
          id: data.cargo.id ?? CONSTANTES.VAZIO,
          descricao: data.cargo.descricao ?? CONSTANTES.VAZIO,
        });

        vaga.setEscolaridade(data.escolaridade ?? CONSTANTES.VAZIO);
        vaga.setPostos(data.postos ?? 0);
        vaga.setEndereco({
          uf: data.endereco.uf ?? CONSTANTES.VAZIO,
          cidade: data.endereco.cidade ?? CONSTANTES.VAZIO,
          codMunicipio: data.endereco.codMunicipio ?? CONSTANTES.VAZIO,
          bairro: data.endereco.bairro ?? CONSTANTES.VAZIO,
        });
        vaga.setPcd(data.pcd ?? false);
        vaga.setDataCadastro(data.dataCadastro ?? Timestamp.now());

        vagas.push(vaga);
      });
      return vagas;
    } catch (error) {
      console.error("Erro ao buscar vagas: ", error);
      throw new Error("Erro ao buscar vagas");
    }
  }


  async findOne(id: string) {
    try {
      const docRef = doc(firestore, CONSTANTES.FB_VAGAS_COLLECTION, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      } else {
        throw new Error(`A vaga com ID ${id} não foi encontrada`);
      }
    } catch (error) {
      console.error('Erro encontrado ao tentar buscar a vaga:', error);
      throw error;
    }
  }

  async update(id: string, updateVagasDto: any) {
    try {
      const docRef = doc(firestore, CONSTANTES.FB_VAGAS_COLLECTION, id);
  
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        console.error(`Documento com ID ${id} não encontrado.`);
        throw new Error(`Documento com ID ${id} não foi encontrado.`);
      }
  
      // Remover o campo dataCadastro para preservar seu valor original
      const { dataCadastro, uf, cidade, codMunicipio, bairro, cargo, ...rest } = updateVagasDto;
  
      const formattedUpdateDto = {
        ...rest,
        cargo: {
          id: cargo?.id ?? CONSTANTES.VAZIO,
          descricao: cargo?.descricao ?? CONSTANTES.VAZIO,
        },
        endereco: {
          uf: uf ?? CONSTANTES.VAZIO,
          cidade: cidade ?? CONSTANTES.VAZIO,
          codMunicipio: codMunicipio ?? CONSTANTES.VAZIO,
          bairro: bairro ?? CONSTANTES.VAZIO,
        },
      };
  
      // Atualizando o documento, sem o campo dataCadastro
      await setDoc(docRef, formattedUpdateDto, { merge: true });
      console.log(`Vaga com ID ${id} atualizada com sucesso.`);
  
      return { id, ...formattedUpdateDto };
    } catch (error) {
      console.error(`Erro ao tentar atualizar a vaga com ID ${id}:`, error);
      throw new Error('FALHA_ATUALIZAR_VAGA');
    }
  }
     

  async remove(id: string) {
    try {
      const docRef = doc(firestore, CONSTANTES.FB_VAGAS_COLLECTION, id);
      await deleteDoc(docRef);
      return { message: `Vaga com ID ${id} removido com sucesso.` };
    } catch (error) {
      console.error(`Erro ao tentar remover a vaga com ID ${id}:`, error);
      throw error;
    }
  }
}