import { Injectable } from '@nestjs/common';
import { CreateSegmentoDto } from './dto/create-segmento.dto';
import { UpdateSegmentoDto } from './dto/update-segmento.dto';
import { Segmento } from './entities/segmento.entity';
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
import { CONSTANTES } from '../common/constantes';
import { firestore } from '../firebaseConfig';

@Injectable()
export class SegmentosService {
  async create(createParceiroDto: CreateSegmentoDto) {
    try {
      const userCollectionRef = collection(firestore,CONSTANTES.FB_SEGMENTOS_COLLECTION);
      const docRef = await addDoc(userCollectionRef, createParceiroDto);
      return { id: docRef.id, ...createParceiroDto };
    } catch (error) {
      console.log(error)
    }
  }

  async findAll() {
    const segmento: Segmento[] = [];
    const docRef = await getDocs(
      collection(firestore, CONSTANTES.FB_SEGMENTOS_COLLECTION),
    );
    docRef.docs.map((doc) => {
      segmento.push(doc.data() as Segmento);
    });
    return segmento;
  }

  async findOne(id: string) {
    try {
      const docRef = doc(firestore, CONSTANTES.FB_SEGMENTOS_COLLECTION, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return {id: docSnap.id, ...docSnap.data() };
      } else {
        throw new Error(`O segmento com ID ${id} não foi encontrado`);
      }
    } catch (error) {
      console.error('Erro encontrado ao tentar buscar o segmento:', error);
      throw error; 
    }
  }

  async update(id: string, updateVagasDto: UpdateSegmentoDto) {
    try {
      const docRef = doc(firestore, CONSTANTES.FB_SEGMENTOS_COLLECTION, id);
      await setDoc(docRef, updateVagasDto, { merge: true });
      return { id, ...updateVagasDto };
    } catch (error) {
      console.error(`Erro ao tentar atualizar dados do segmento com ID ${id}:`, error);
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const docRef = doc(firestore, CONSTANTES.FB_SEGMENTOS_COLLECTION, id);
      await deleteDoc(docRef);
      return { message: `Segmento com ID ${id} removido com sucesso.` };
    } catch (error) {
      console.error(`Erro ao tentar remover o segmento com ID ${id}:`, error);
      throw error;
    }
  }
}