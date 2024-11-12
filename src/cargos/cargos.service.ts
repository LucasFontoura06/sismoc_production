import { Injectable } from '@nestjs/common';
import { CreateCargoDto } from './dto/create-cargo.dto';
import { UpdateCargoDto } from './dto/update-cargo.dto';
import { Cargo } from './entities/cargo.entity';
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
export class CargosService {
  async create(createCargoDto: CreateCargoDto) {
    try {
      const userCollectionRef = collection(firestore, CONSTANTES.FB_CARGOS_COLLECTION);
      const docRef = await addDoc(userCollectionRef, createCargoDto);
      await updateDoc(docRef, { id: docRef.id });
      return { id: docRef.id, ...createCargoDto };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findAll() {
    const cargos: Cargo[] = [];
    const docRef = await getDocs(collection(firestore, CONSTANTES.FB_CARGOS_COLLECTION));
    docRef.docs.map((doc) => {
      cargos.push(doc.data() as Cargo);
    });
    return cargos;
  }

  async findOne(id: string) {
    try {
      const docRef = doc(firestore, CONSTANTES.FB_CARGOS_COLLECTION, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      } else {
        throw new Error(`O cargo com ID ${id} não foi encontrada`);
      }
    } catch (error) {
      console.error('Erro encontrado ao tentar buscar o cargo:', error);
      throw error;
    }
  }

  async update(id: string, updateCargoDto: UpdateCargoDto) {
    try {
      const docRef = doc(firestore, CONSTANTES.FB_CARGOS_COLLECTION, id);
      await setDoc(docRef, updateCargoDto, { merge: true });
      return { id, ...updateCargoDto };
    } catch (error) {
      console.error(`Erro ao tentar atualizar dados do cargo com ID ${id}:`, error);
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const docRef = doc(firestore, CONSTANTES.FB_CARGOS_COLLECTION, id);
      await deleteDoc(docRef);
      return { message: `Cargo com ID ${id} removido com sucesso.` };
    } catch (error) {
      console.error(`Erro ao tentar remover o cargo com ID ${id}:`, error);
      throw error;
    }
  }
}