import { Injectable } from '@nestjs/common';
import { Endereco } from './entities/endereco.entity';
import { 
  addDoc, 
  collection, 
  doc, 
  getDocs,
  updateDoc,
  getDoc,
  setDoc,
  deleteDoc,  
  query,
  Timestamp,
  orderBy,
  OrderByDirection
} from 'firebase/firestore';
import { firestore } from '../firebaseConfig';
import { CONSTANTES } from '../common/constantes';

@Injectable()
export class EnderecosService {
  async create(createEnderecoDto: any) {
    try {
      const enderecosCollectionRef = collection(
        firestore,
        CONSTANTES.FB_ENDERECOS_COLLECTION,
      );
      createEnderecoDto.dataCadastro = Timestamp.now();
      const docRef = await addDoc(enderecosCollectionRef, createEnderecoDto);
      await updateDoc(
        doc(firestore, CONSTANTES.FB_ENDERECOS_COLLECTION, docRef.id),
        { id: docRef.id },
      );
      return { id: docRef.id };
    } catch (error) {
      console.log(error);
      throw new Error('Erro ao criar o endereço');
    }
  }

  async findAll() {
    const enderecos: Endereco[] = [];
    const docRef = await getDocs(
      query(
        collection(firestore, CONSTANTES.FB_ENDERECOS_COLLECTION),
        orderBy(
          CONSTANTES.SORT_DATA_CADASTRO,
          CONSTANTES.SORT_DECRESCENTE as OrderByDirection,
        ),
      ),
    );

    docRef.docs.map((doc) => {
      const data = doc.data();
      const endereco = new Endereco(
        doc.id,
        data.bairro ?? CONSTANTES.VAZIO,
        data.cep ?? CONSTANTES.VAZIO,
        data.cidade ?? CONSTANTES.VAZIO,
        data.codMunicipio ?? CONSTANTES.VAZIO,
        data.complemento ?? CONSTANTES.VAZIO,
        data.logradouro ?? CONSTANTES.VAZIO,
        data.numero ?? CONSTANTES.VAZIO,
        data.uf ?? CONSTANTES.VAZIO,
        data.dataCadastro ?? Timestamp.now()
      );
      enderecos.push(endereco);
    });
    
    return enderecos;
  }

  async findOne(id: string) {
    try {
      const docRef = doc(firestore, CONSTANTES.FB_ENDERECOS_COLLECTION, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      } else {
        throw new Error(`O endereço com ID ${id} não foi encontrado`);
      }
    } catch (error) {
      console.error('Erro ao buscar o endereço:', error);
      throw error; 
    }
  }

  async update(id: string, updateEnderecoDto: any) {
    try {
      const docRef = doc(firestore, CONSTANTES.FB_ENDERECOS_COLLECTION, id);
      await setDoc(docRef, updateEnderecoDto, { merge: true });
      return { id, ...updateEnderecoDto };
    } catch (error) {
      console.error(`Erro ao atualizar o endereço com ID ${id}:`, error);
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const docRef = doc(firestore, CONSTANTES.FB_ENDERECOS_COLLECTION, id);
      await deleteDoc(docRef);
      return { message: `Endereço com ID ${id} removido com sucesso.` };
    } catch (error) {
      console.error(`Erro ao remover o endereço com ID ${id}:`, error);
      throw error;
    }
  }
}