import { Injectable } from '@nestjs/common';
import { CreateContatoDto } from './dto/create-contato.dto';
import { UpdateContatoDto } from './dto/update-contato.dto';
import { Contato } from './entities/contato.entity';
import {
  addDoc,
  collection,
  doc,
  Firestore,
  getDoc,
  getDocs,
  deleteDoc,
  setDoc,
  updateDoc
} from 'firebase/firestore';
import { CONSTANTES } from 'src/common/constantes';
import { firestore } from 'src/firebaseConfig';

@Injectable()
export class ContatosService {
  async create(createParceiroDto: CreateContatoDto) {
    try {
      const userCollectionRef = collection(firestore,CONSTANTES.FB_CONTATOS_COLLECTION);
      const docRef = await addDoc(userCollectionRef, createParceiroDto);
      await updateDoc(
        doc(firestore, CONSTANTES.FB_CONTATOS_COLLECTION, docRef.id),
        { id: docRef.id },
      );
      return { id: docRef.id, ...createParceiroDto };
    } catch (error) {
      console.log(error)
    }
  }

  async findAll() {
    const contatos: Contato[] = [];
    const docRef = await getDocs(
      collection(firestore, CONSTANTES.FB_CONTATOS_COLLECTION),
    );
    docRef.docs.map((doc) => {
      contatos.push(doc.data() as Contato);
    });
    return contatos;
  }

  async findOne(id: string) {
    try {
      const docRef = doc(firestore, CONSTANTES.FB_CONTATOS_COLLECTION, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return {id: docSnap.id, ...docSnap.data() };
      } else {
        throw new Error(`O contato com ID ${id} não foi encontrada`);
      }
    } catch (error) {
      console.error('Erro encontrado ao tentar buscar o contato:', error);
      throw error; 
    }
  }

  async update(id: string, updateVagasDto: UpdateContatoDto) {
    try {
      const docRef = doc(firestore, CONSTANTES.FB_CONTATOS_COLLECTION, id);
      await setDoc(docRef, updateVagasDto, { merge: true });
      return { id, ...updateVagasDto };
    } catch (error) {
      console.error(`Erro ao tentar atualizar dados do contato com ID ${id}:`, error);
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const docRef = doc(firestore, CONSTANTES.FB_CONTATOS_COLLECTION, id);
      await deleteDoc(docRef);
      return { message: `Contato com ID ${id} removido com sucesso.` };
    } catch (error) {
      console.error(`Erro ao tentar remover o contato com ID ${id}:`, error);
      throw error;
    }
  }
}
