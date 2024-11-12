import { Injectable } from '@nestjs/common';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  OrderByDirection,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { CONSTANTES } from '../common/constantes';
import { firestore } from 'src/firebaseConfig';
import { UpdateParceiroDto } from './dto/update-parceiro.dto';
import { Parceiro } from './entities/parceiro.entity';

@Injectable()
export class ParceirosService {
  async create(createParceiroDto: any) {
    try {
      const parceiroCollectionRef = collection(
        firestore,
        CONSTANTES.FB_PARCEIROS_COLLECTION,
      );
      const docRef = await addDoc(parceiroCollectionRef, createParceiroDto);
      await updateDoc(
        doc(firestore, CONSTANTES.FB_PARCEIROS_COLLECTION, docRef.id),
        { id: docRef.id },
      );
      return { id: docRef.id };
    } catch (error) {
      console.log(error);
    }
  }

  async findAll() {
    const parceiros: Parceiro[] = [];
    const docRef = await getDocs(
      query(
        collection(firestore, CONSTANTES.FB_PARCEIROS_COLLECTION),
        orderBy(
          CONSTANTES.SORT_DATA_CADASTRO,
          CONSTANTES.SORT_DECRESCENTE as OrderByDirection,
        ),
      ),
    );
    docRef.docs.map((doc) => {
      parceiros.push(doc.data() as Parceiro);
    });
    return parceiros;
  }

  async findOne(id: string) {
    try {
      const docRefParceiro = doc(
        firestore,
        CONSTANTES.FB_PARCEIROS_COLLECTION,
        id,
      );
      const docSnap = await getDoc(docRefParceiro);

      const docRefIJ = collection(
        firestore,
        CONSTANTES.FB_INSTR_JURID_COLLECTION,
      );
      const q = query(
        docRefIJ,
        where(CONSTANTES.FB_ID_PARCEIRO, '==', docSnap.id),
      );
      const docSnapIJ = await getDocs(q);

      const docRefContatos = collection(
        firestore,
        CONSTANTES.FB_CONTATOS_COLLECTION,
      );
      const qContato = query(
        docRefContatos,
        where(CONSTANTES.FB_ID_PARCEIRO, '==', docSnap.id),
      );
      const docSnapContato = await getDocs(qContato);

      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...docSnap.data(),
          ...docSnapIJ.docs.map((doc) => doc.data()),
          ...docSnapContato.docs.map((doc) => doc.data()),
        };
      } else {
        throw new Error(`O parceiro com ID ${id} não foi encontrada`);
      }
    } catch (error) {
      console.error('Erro encontrado ao tentar buscar o parceiro:', error);
      throw error;
    }
  }

  async update(id: string, updateVagasDto: UpdateParceiroDto) {
    try {
      const docRef = doc(firestore, CONSTANTES.FB_PARCEIROS_COLLECTION, id);
      await setDoc(docRef, updateVagasDto, { merge: true });
      return { id, ...updateVagasDto };
    } catch (error) {
      console.error(
        `Erro ao tentar atualizar dados do parceiro com ID ${id}:`,
        error,
      );
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const docRef = doc(firestore, CONSTANTES.FB_PARCEIROS_COLLECTION, id);
      await deleteDoc(docRef);
      return { message: `Parceiro com ID ${id} removido com sucesso.` };
    } catch (error) {
      console.error(`Erro ao tentar remover o parceiro com ID ${id}:`, error);
      throw error;
    }
  }
}
