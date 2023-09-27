export type ProjectType = {
  associate_id: number;
  client_company_name: string
  contract_number: string
  master_client_company_id: number
  name: string
  total_price_contract: number
}

export type DataStandard = {
  standard_detail_project_client_id: number;
  project_id: number;
  type_of_certification_id: number;
  price: number;
  loss_value: 1;
  type_of_certification_number: string
}

export type ProjectDetail = {
  project_id: number;
  contract_number: string;
  associate_id: number;
  master_client_company_id: number;
  total_price: 9500000;
  detail_price: string;
  expired_date: Date;
  created_date: Date;
  created_by: number;
  handle_by: number;
  project_step_id: number;
  status_certificate_id: number;
  payment_status_id: number;
  is_deleted: number;
  cycle_date: Date;
  cycle_user: number;
  wa_reminder_3bln: null;
  wa_reminder_2bln: null;
  wa_reminder_1bln: null;
  waktu_pesan_terkirim_3bln: null;
  waktu_pesan_terkirim_2bln: null;
  waktu_pesan_terkirim_1bln: null;
  data_standard: DataStandard[]
}

export type Profile = {
  address: string
  associate_id: number
  bank_atas_nama: string
  bank_code: string
  create_date: Date | null
  diverifikasi_oleh: number
  email: string
  is_valid: number
  job: string
  ktp_image: File
  master_sales_employee_id: number
  name: string
  no_hp: string
  no_rek_associate: string
  password: string
  signature: string
  sumber_informasi: number
  term_of_service_signature: File
  tgl_diverifikasi: string
  token: string
}

export type HandleByProject = {
  associate_id: number;
  project_id: number;
  handle_by: number;
}