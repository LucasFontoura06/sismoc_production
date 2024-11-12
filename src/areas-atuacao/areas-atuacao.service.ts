import { Injectable } from '@nestjs/common';
import { CreateAreasAtuacaoDto } from './dto/create-areas-atuacao.dto';
import { UpdateAreasAtuacaoDto } from './dto/update-areas-atuacao.dto';
import { AreasAtuacao } from './entities/areas-atuacao.entity';
import {
  addDoc,
  collection,
  doc,
  Firestore,
  getDoc,
  getDocs,
  deleteDoc,
  setDoc
} from 'firebase/firestore';
import { CONSTANTES } from 'src/common/constantes';
import { firestore } from 'src/firebaseConfig';

@Injectable()
export class AreasAtuacaoService {
  async create(createParceiroDto: CreateAreasAtuacaoDto) {
    try {
      const userCollectionRef = collection(firestore,CONSTANTES.FB_AREAS_ATUACAO_COLLECTION);
      const docRef = await addDoc(userCollectionRef, createParceiroDto);
      return { id: docRef.id, ...createParceiroDto };
    } catch (error) {
      console.log(error)
    }
  }

  async findAll() {
    const areasAtuacao: AreasAtuacao[] = [];
    const docRef = await getDocs(
      collection(firestore, CONSTANTES.FB_AREAS_ATUACAO_COLLECTION),
    );
    docRef.docs.map((doc) => {
      areasAtuacao.push(doc.data() as AreasAtuacao);
    });
    return areasAtuacao;
  }

  async findOne(id: string) {
    try {
      const docRef = doc(firestore, CONSTANTES.FB_AREAS_ATUACAO_COLLECTION, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return {id: docSnap.id, ...docSnap.data() };
      } else {
        throw new Error(`A area de atuacao de ID ${id} não foi encontrada`);
      }
    } catch (error) {
      console.error('Erro encontrado ao tentar buscar a area de atuacao:', error);
      throw error; 
    }
  }

  async update(id: string, updateVagasDto: UpdateAreasAtuacaoDto) {
    try {
      const docRef = doc(firestore, CONSTANTES.FB_AREAS_ATUACAO_COLLECTION, id);
      await setDoc(docRef, updateVagasDto, { merge: true });
      return { id, ...updateVagasDto };
    } catch (error) {
      console.error(`Erro ao tentar atualizar dados a area de atuacao de ID ${id}:`, error);
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const docRef = doc(firestore, CONSTANTES.FB_AREAS_ATUACAO_COLLECTION, id);
      await deleteDoc(docRef);
      return { message: `Area de atuacao de ID ${id} removido com sucesso.` };
    } catch (error) {
      console.error(`Erro ao tentar remover a area de atuacao de ID ${id}:`, error);
      throw error;
    }
  }
}
