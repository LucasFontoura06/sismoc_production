import { Injectable } from '@nestjs/common';
import { CreateInstrumentosJuridicoDto } from './dto/create-instrumentos-juridico.dto';
import { UpdateInstrumentosJuridicoDto } from './dto/update-instrumentos-juridico.dto';
import { InstrumentosJuridico } from './entities/instrumentos-juridico.entity';
import {
  addDoc,
  collection,
  doc,
  Firestore,
  getDoc,
  getDocs,
  deleteDoc,
  setDoc,
  Timestamp,
  updateDoc
} from 'firebase/firestore';
import { CONSTANTES } from '../common/constantes';
import { firestore } from '../firebaseConfig';
import { TipoInstrumentoJuridico } from './entities/tipo-instrumento-juridico';
import { Status } from './entities/status';

@Injectable()
export class InstrumentosJuridicoService {
  async create(createInstrumentoJuridicoDto: any) {
    try {
      createInstrumentoJuridicoDto.dataCadastro = Timestamp.now();
      
      const instrumentoJuridicoCollectionRef = collection(firestore, CONSTANTES.FB_INSTR_JURID_COLLECTION);
      const docRef = await addDoc(instrumentoJuridicoCollectionRef, createInstrumentoJuridicoDto);
      await updateDoc(
        doc(firestore, CONSTANTES.FB_INSTR_JURID_COLLECTION, docRef.id),
        { id: docRef.id },
      );
      return { id: docRef.id, ...createInstrumentoJuridicoDto };
    } catch (error) {
      console.log(error)
    }
  }

  async findAll() {
    const instrumentosJuridicos: InstrumentosJuridico[] = [];
    const docRef = await getDocs(
      collection(firestore, CONSTANTES.FB_INSTR_JURID_COLLECTION),
    );
    docRef.docs.map((doc) => {
      instrumentosJuridicos.push(doc.data() as InstrumentosJuridico);
    });
    return instrumentosJuridicos;
  }

  async findAllTypes() {
    const tipos: TipoInstrumentoJuridico[] = [];
    const docRef = await getDocs(
      collection(firestore, CONSTANTES.FB_TIPOS_INST_JURID_COLLECTION),
    );
    docRef.docs.map((doc) => {
      tipos.push(doc.data() as TipoInstrumentoJuridico);
    });
    return tipos;
  }

  async findAllStatus() {
    const status: Status[] = [];
    const docRef = await getDocs(
      collection(firestore, CONSTANTES.FB_STATUS_INST_JURID_COLLECTION),
    );
    docRef.docs.map((doc) => {
      status.push(doc.data() as Status);
    });
    return status;
  }

  async findOne(id: string) {
    try {
      const docRef = doc(firestore, CONSTANTES.FB_INSTR_JURID_COLLECTION, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return {id: docSnap.id, ...docSnap.data() };
      } else {
        throw new Error(`O instrumento juridico de ID ${id} não foi encontrado`);
      }
    } catch (error) {
      console.error('Erro encontrado ao tentar buscar o instrumento juridico:', error);
      throw error; 
    }
  }

  async update(id: string, updateVagasDto: UpdateInstrumentosJuridicoDto) {
    try {
      const docRef = doc(firestore, CONSTANTES.FB_INSTR_JURID_COLLECTION, id);
      await setDoc(docRef, updateVagasDto, { merge: true });
      return { id, ...updateVagasDto };
    } catch (error) {
      console.error(`Erro ao tentar atualizar dados do instrumento juridico com ID ${id}:`, error);
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const docRef = doc(firestore, CONSTANTES.FB_INSTR_JURID_COLLECTION, id);
      await deleteDoc(docRef);
      return { message: `Instrumento juridico de ID ${id} removido com sucesso.` };
    } catch (error) {
      console.error(`Erro ao tentar remover o instrumento juridico de ID ${id}:`, error);
      throw error;
    }
  }
}
