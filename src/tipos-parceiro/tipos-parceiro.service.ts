import { Injectable } from '@nestjs/common';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc
} from 'firebase/firestore';
import { CONSTANTES } from '../common/constantes';
import { firestore } from '../firebaseConfig';
import { CreateTiposParceiroDto } from './dto/create-tipos-parceiro.dto';
import { UpdateTiposParceiroDto } from './dto/update-tipos-parceiro.dto';
import { TiposParceiro } from './entities/tipos-parceiro.entity';

@Injectable()
export class TiposParceiroService {
  async create(createTiposParceiroDto: CreateTiposParceiroDto) {
    try {
      const userCollectionRef = collection(firestore,CONSTANTES.FB_TIPOS_PARCEIRO_COLLECTION);
      const docRef = await addDoc(userCollectionRef, createTiposParceiroDto);
      return { id: docRef.id, ...createTiposParceiroDto };
    } catch (error) {
      console.log(error)
    }
  }

  async findAll() {
    const tiposParceiro: TiposParceiro[] = [];
    const docRef = await getDocs(
      collection(firestore, CONSTANTES.FB_TIPOS_PARCEIRO_COLLECTION),
    );
    docRef.docs.map((doc) => {
      tiposParceiro.push(doc.data() as TiposParceiro);
    });
    return tiposParceiro;
  }

  async findOne(id: string) {
    try {
      const docRef = doc(firestore, CONSTANTES.FB_TIPOS_PARCEIRO_COLLECTION, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return {id: docSnap.id, ...docSnap.data() };
      } else {
        throw new Error(`O tipo de parceiro com ID ${id} não foi encontrada`);
      }
    } catch (error) {
      console.error('Erro encontrado ao tentar buscar o tipo de parceiro:', error);
      throw error; 
    }
  }

  async update(id: string, updateVagasDto: UpdateTiposParceiroDto) {
    try {
      const docRef = doc(firestore, CONSTANTES.FB_TIPOS_PARCEIRO_COLLECTION, id);
      await setDoc(docRef, updateVagasDto, { merge: true });
      return { id, ...updateVagasDto };
    } catch (error) {
      console.error(`Erro ao tentar atualizar dados do tipo de parceiro com ID ${id}:`, error);
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const docRef = doc(firestore, CONSTANTES.FB_TIPOS_PARCEIRO_COLLECTION, id);
      await deleteDoc(docRef);
      return { message: `Tipo de parceiro com ID ${id} removido com sucesso.` };
    } catch (error) {
      console.error(`Erro ao tentar remover o tipo de parceiro com ID ${id}:`, error);
      throw error;
    }
  }
}
