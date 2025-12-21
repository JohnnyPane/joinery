# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2025_12_17_193440) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum"
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "addresses", force: :cascade do |t|
    t.string "addressable_type", null: false
    t.bigint "addressable_id", null: false
    t.string "address_1", null: false
    t.string "address_2"
    t.string "city"
    t.string "state"
    t.string "zip"
    t.string "country", default: "US", null: false
    t.string "address_type", default: "shipping", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["addressable_type", "addressable_id", "address_type"], name: "index_addresses_on_addressable_and_type"
    t.index ["addressable_type", "addressable_id"], name: "index_addresses_on_addressable"
  end

  create_table "bids", force: :cascade do |t|
    t.bigint "product_id", null: false
    t.bigint "buyer_id", null: false
    t.bigint "seller_id", null: false
    t.integer "amount_in_cents", null: false
    t.integer "status", default: 0, null: false
    t.text "message"
    t.datetime "accepted_at"
    t.datetime "rejected_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["buyer_id"], name: "index_bids_on_buyer_id"
    t.index ["product_id"], name: "index_bids_on_product_id"
    t.index ["seller_id"], name: "index_bids_on_seller_id"
  end

  create_table "cart_items", force: :cascade do |t|
    t.bigint "cart_id", null: false
    t.bigint "product_id", null: false
    t.bigint "store_id", null: false
    t.decimal "ordered_volume", precision: 10, scale: 3, default: "0.0", null: false
    t.integer "unit_price_per_volume_in_cents", null: false
    t.integer "total_price_in_cents", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "shipping_option_id"
    t.bigint "quote_request_id"
    t.string "pricing_unit", default: "EACH", null: false
    t.index ["cart_id"], name: "index_cart_items_on_cart_id"
    t.index ["pricing_unit"], name: "index_cart_items_on_pricing_unit"
    t.index ["product_id"], name: "index_cart_items_on_product_id"
    t.index ["quote_request_id"], name: "index_cart_items_on_quote_request_id"
    t.index ["shipping_option_id"], name: "index_cart_items_on_shipping_option_id"
    t.index ["store_id"], name: "index_cart_items_on_store_id"
  end

  create_table "carts", force: :cascade do |t|
    t.bigint "user_id"
    t.boolean "guest", default: true, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "guest_token"
    t.index ["guest_token"], name: "index_carts_on_guest_token", unique: true
    t.index ["user_id"], name: "index_carts_on_user_id"
  end

  create_table "figure_types", force: :cascade do |t|
    t.string "name", null: false
    t.string "label", null: false
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_figure_types_on_name", unique: true
  end

  create_table "jwt_denylists", force: :cascade do |t|
    t.string "jti"
    t.datetime "exp"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["jti"], name: "index_jwt_denylists_on_jti"
  end

  create_table "logs", force: :cascade do |t|
    t.string "species", null: false
    t.decimal "length_in_feet", precision: 10, scale: 2, null: false
    t.decimal "diameter_at_small_end_in_inches", precision: 10, scale: 2, null: false
    t.decimal "weight_in_pounds", precision: 10, scale: 2
    t.string "origin"
    t.integer "grade"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.decimal "diameter_at_large_end_in_inches", precision: 10, scale: 2
    t.decimal "estimated_board_feet", precision: 10, scale: 2, default: "0.0", null: false
    t.integer "log_rule", default: 0
    t.decimal "moisture_content_percent", precision: 5, scale: 2
  end

  create_table "lumbers", force: :cascade do |t|
    t.string "species", null: false
    t.integer "finish_type", default: 0, null: false
    t.decimal "thickness_in_inches", precision: 6, scale: 2
    t.decimal "width_in_inches", precision: 6, scale: 2
    t.integer "length_in_feet"
    t.string "nominal_dimension"
    t.decimal "moisture_content_percent", precision: 5, scale: 2
    t.decimal "board_feet", precision: 8, scale: 2
    t.string "grade"
    t.string "profile"
    t.string "treatment"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["board_feet"], name: "index_lumbers_on_board_feet"
    t.index ["finish_type"], name: "index_lumbers_on_finish_type"
    t.index ["grade"], name: "index_lumbers_on_grade"
    t.index ["nominal_dimension"], name: "index_lumbers_on_nominal_dimension"
    t.index ["profile"], name: "index_lumbers_on_profile"
    t.index ["species"], name: "index_lumbers_on_species"
    t.index ["thickness_in_inches"], name: "index_lumbers_on_thickness_in_inches"
    t.index ["treatment"], name: "index_lumbers_on_treatment"
    t.index ["width_in_inches"], name: "index_lumbers_on_width_in_inches"
  end

  create_table "mouldings", force: :cascade do |t|
    t.string "species", null: false
    t.string "material_grade", null: false
    t.string "substrate_material"
    t.decimal "length_per_piece_feet", precision: 6, scale: 2, null: false
    t.decimal "nominal_width_inches", precision: 6, scale: 2, null: false
    t.decimal "nominal_thickness_inches", precision: 6, scale: 2, null: false
    t.decimal "actual_width_inches", precision: 6, scale: 2, null: false
    t.decimal "actual_thickness_inches", precision: 6, scale: 2, null: false
    t.string "profile_type", null: false, comment: "baseboard, crown_moulding, casing, chair_rail, etc."
    t.string "profile_style", comment: "historical, modern, colonial, shaker"
    t.string "standard_id"
    t.string "surfacing", null: false, comment: "S4S, S2S, rough_sawn"
    t.boolean "finish_sanded", default: false, null: false
    t.string "edge_treatment", default: "square_cut", comment: "square_cut, mitered_cut, eased_edge"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["actual_thickness_inches"], name: "index_mouldings_on_actual_thickness_inches"
    t.index ["actual_width_inches"], name: "index_mouldings_on_actual_width_inches"
    t.index ["edge_treatment"], name: "index_mouldings_on_edge_treatment"
    t.index ["length_per_piece_feet"], name: "index_mouldings_on_length_per_piece_feet"
    t.index ["nominal_thickness_inches"], name: "index_mouldings_on_nominal_thickness_inches"
    t.index ["nominal_width_inches"], name: "index_mouldings_on_nominal_width_inches"
    t.index ["profile_style"], name: "index_mouldings_on_profile_style"
    t.index ["profile_type"], name: "index_mouldings_on_profile_type"
    t.index ["surfacing"], name: "index_mouldings_on_surfacing"
  end

  create_table "order_items", force: :cascade do |t|
    t.bigint "order_id", null: false
    t.bigint "product_id", null: false
    t.bigint "store_id", null: false
    t.bigint "shipping_option_id", null: false
    t.decimal "ordered_volume", precision: 10, scale: 3, default: "0.0", null: false
    t.integer "shipping_cost_in_cents", default: 0, null: false
    t.integer "unit_price_per_volume_in_cents", null: false
    t.integer "total_price_in_cents", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "stripe_transfer_id"
    t.string "status", default: "awaiting_shipping", null: false
    t.bigint "quote_request_id"
    t.string "pricing_unit", default: "EACH", null: false
    t.index ["order_id", "product_id"], name: "index_order_items_on_order_id_and_product_id", unique: true
    t.index ["order_id"], name: "index_order_items_on_order_id"
    t.index ["pricing_unit"], name: "index_order_items_on_pricing_unit"
    t.index ["product_id"], name: "index_order_items_on_product_id"
    t.index ["quote_request_id"], name: "index_order_items_on_quote_request_id"
    t.index ["shipping_option_id"], name: "index_order_items_on_shipping_option_id"
    t.index ["store_id"], name: "index_order_items_on_store_id"
  end

  create_table "orders", force: :cascade do |t|
    t.bigint "user_id"
    t.integer "status", default: 0, null: false
    t.string "stripe_charge_id"
    t.string "stripe_payment_intent_id"
    t.string "tracking_number"
    t.string "customer_email", null: false
    t.string "customer_phone_number"
    t.string "customer_name"
    t.integer "total_amount_in_cents", default: 0, null: false
    t.boolean "paid", default: false, null: false
    t.boolean "billing_same_as_shipping", default: true, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["customer_email"], name: "index_orders_on_customer_email"
    t.index ["paid"], name: "index_orders_on_paid"
    t.index ["status"], name: "index_orders_on_status"
    t.index ["user_id"], name: "index_orders_on_user_id"
  end

  create_table "products", force: :cascade do |t|
    t.string "name", null: false
    t.text "description"
    t.integer "price_per_unit_in_cents", null: false
    t.decimal "available_volume", precision: 10, scale: 3, default: "0.0", null: false
    t.bigint "store_id", null: false
    t.boolean "is_active", default: true, null: false
    t.string "productable_type", null: false
    t.bigint "productable_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "requestable", default: false, null: false
    t.boolean "biddable", default: false, null: false
    t.integer "min_bid_amount_in_cents"
    t.virtual "name_vector", type: :tsvector, as: "to_tsvector('simple'::regconfig, (COALESCE(name, ''::character varying))::text)", stored: true
    t.integer "reviews_count", default: 0, null: false
    t.decimal "average_rating", precision: 4, scale: 2, default: "0.0", null: false
    t.string "primary_material"
    t.string "species_tags", default: [], array: true
    t.string "material_tags", default: [], array: true
    t.string "pricing_unit", default: "EACH", null: false
    t.decimal "min_order_unit", precision: 10, scale: 3, default: "1.0", null: false
    t.index ["available_volume"], name: "index_products_on_available_volume"
    t.index ["average_rating"], name: "index_products_on_average_rating"
    t.index ["is_active"], name: "index_products_on_is_active"
    t.index ["material_tags"], name: "index_products_on_material_tags", using: :gin
    t.index ["name_vector"], name: "index_products_on_name_vector", using: :gin
    t.index ["price_per_unit_in_cents"], name: "index_products_on_price_per_unit_in_cents"
    t.index ["pricing_unit"], name: "index_products_on_pricing_unit"
    t.index ["primary_material"], name: "index_products_on_primary_material"
    t.index ["productable_type", "productable_id"], name: "index_products_on_productable"
    t.index ["requestable"], name: "index_products_on_requestable"
    t.index ["species_tags"], name: "index_products_on_species_tags", using: :gin
    t.index ["store_id"], name: "index_products_on_store_id"
  end

  create_table "quote_requests", force: :cascade do |t|
    t.bigint "product_id", null: false
    t.bigint "buyer_id", null: false
    t.bigint "seller_id", null: false
    t.integer "status", default: 0, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "quote_type", default: 0, null: false
    t.bigint "parent_quote_request_id"
    t.decimal "requested_volume", precision: 10, scale: 3, default: "0.0", null: false
    t.string "pricing_unit", default: "EACH", null: false
    t.index ["buyer_id"], name: "index_quote_requests_on_buyer_id"
    t.index ["parent_quote_request_id"], name: "index_quote_requests_on_parent_quote_request_id"
    t.index ["pricing_unit"], name: "index_quote_requests_on_pricing_unit"
    t.index ["product_id"], name: "index_quote_requests_on_product_id"
    t.index ["seller_id"], name: "index_quote_requests_on_seller_id"
  end

  create_table "quotes", force: :cascade do |t|
    t.bigint "quote_request_id", null: false
    t.string "author_type", null: false
    t.bigint "author_id", null: false
    t.integer "amount_in_cents", null: false
    t.integer "action"
    t.text "message"
    t.string "role"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["author_type", "author_id"], name: "index_quotes_on_author"
    t.index ["quote_request_id"], name: "index_quotes_on_quote_request_id"
  end

  create_table "reviews", force: :cascade do |t|
    t.integer "rating"
    t.text "body"
    t.bigint "user_id", null: false
    t.string "reviewable_type", null: false
    t.bigint "reviewable_id", null: false
    t.boolean "verified_purchase"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["reviewable_type", "reviewable_id"], name: "index_reviews_on_reviewable"
    t.index ["user_id"], name: "index_reviews_on_user_id"
  end

  create_table "sheet_goods", force: :cascade do |t|
    t.integer "material_type", default: 0, null: false
    t.string "face_species"
    t.string "back_species"
    t.string "grade_face"
    t.string "grade_back"
    t.integer "core_type", default: 0, null: false
    t.integer "cut_style"
    t.integer "ply_count"
    t.integer "glue_type"
    t.string "thickness_nominal"
    t.decimal "thickness_actual", precision: 5, scale: 3
    t.integer "width_in_feet"
    t.integer "length_in_feet"
    t.boolean "is_prefinished", default: false
    t.boolean "is_shop_grade", default: false
    t.string "matching"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["back_species"], name: "index_sheet_goods_on_back_species"
    t.index ["core_type"], name: "index_sheet_goods_on_core_type"
    t.index ["face_species"], name: "index_sheet_goods_on_face_species"
    t.index ["length_in_feet"], name: "index_sheet_goods_on_length_in_feet"
    t.index ["material_type"], name: "index_sheet_goods_on_material_type"
    t.index ["thickness_nominal"], name: "index_sheet_goods_on_thickness_nominal"
    t.index ["width_in_feet"], name: "index_sheet_goods_on_width_in_feet"
  end

  create_table "shipping_options", force: :cascade do |t|
    t.string "name", default: ""
    t.integer "price_in_cents", default: 0
    t.integer "shipping_type", default: 0, null: false
    t.bigint "product_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "enabled", default: true, null: false
    t.index ["product_id"], name: "index_shipping_options_on_product_id"
  end

  create_table "slabs", force: :cascade do |t|
    t.string "species", null: false
    t.integer "slab_type", default: 0, null: false
    t.decimal "width_at_narrowest_in_inches", precision: 10, scale: 2, null: false
    t.decimal "length_in_inches", precision: 10, scale: 2, null: false
    t.decimal "thickness_in_inches", precision: 10, scale: 2, null: false
    t.decimal "weight_in_pounds", precision: 10, scale: 2
    t.boolean "kiln_dried", default: false, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.decimal "width_at_widest_in_inches", precision: 10, scale: 2, default: "0.0", null: false
    t.decimal "calculated_board_feet", precision: 10, scale: 2, default: "0.0", null: false
    t.decimal "moisture_content_percent", precision: 5, scale: 2
    t.integer "drying_status", default: 0
  end

  create_table "solid_queue_blocked_executions", force: :cascade do |t|
    t.bigint "job_id", null: false
    t.string "queue_name", null: false
    t.integer "priority", default: 0, null: false
    t.string "concurrency_key", null: false
    t.datetime "expires_at", null: false
    t.datetime "created_at", null: false
    t.index ["concurrency_key", "priority", "job_id"], name: "index_solid_queue_blocked_executions_for_release"
    t.index ["expires_at", "concurrency_key"], name: "index_solid_queue_blocked_executions_for_maintenance"
    t.index ["job_id"], name: "index_solid_queue_blocked_executions_on_job_id", unique: true
  end

  create_table "solid_queue_claimed_executions", force: :cascade do |t|
    t.bigint "job_id", null: false
    t.bigint "process_id"
    t.datetime "created_at", null: false
    t.index ["job_id"], name: "index_solid_queue_claimed_executions_on_job_id", unique: true
    t.index ["process_id", "job_id"], name: "index_solid_queue_claimed_executions_on_process_id_and_job_id"
  end

  create_table "solid_queue_failed_executions", force: :cascade do |t|
    t.bigint "job_id", null: false
    t.text "error"
    t.datetime "created_at", null: false
    t.index ["job_id"], name: "index_solid_queue_failed_executions_on_job_id", unique: true
  end

  create_table "solid_queue_jobs", force: :cascade do |t|
    t.string "queue_name", null: false
    t.string "class_name", null: false
    t.text "arguments"
    t.integer "priority", default: 0, null: false
    t.string "active_job_id"
    t.datetime "scheduled_at"
    t.datetime "finished_at"
    t.string "concurrency_key"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["active_job_id"], name: "index_solid_queue_jobs_on_active_job_id"
    t.index ["class_name"], name: "index_solid_queue_jobs_on_class_name"
    t.index ["finished_at"], name: "index_solid_queue_jobs_on_finished_at"
    t.index ["queue_name", "finished_at"], name: "index_solid_queue_jobs_for_filtering"
    t.index ["scheduled_at", "finished_at"], name: "index_solid_queue_jobs_for_alerting"
  end

  create_table "solid_queue_pauses", force: :cascade do |t|
    t.string "queue_name", null: false
    t.datetime "created_at", null: false
    t.index ["queue_name"], name: "index_solid_queue_pauses_on_queue_name", unique: true
  end

  create_table "solid_queue_processes", force: :cascade do |t|
    t.string "kind", null: false
    t.datetime "last_heartbeat_at", null: false
    t.bigint "supervisor_id"
    t.integer "pid", null: false
    t.string "hostname"
    t.text "metadata"
    t.datetime "created_at", null: false
    t.string "name", null: false
    t.index ["last_heartbeat_at"], name: "index_solid_queue_processes_on_last_heartbeat_at"
    t.index ["name", "supervisor_id"], name: "index_solid_queue_processes_on_name_and_supervisor_id", unique: true
    t.index ["supervisor_id"], name: "index_solid_queue_processes_on_supervisor_id"
  end

  create_table "solid_queue_ready_executions", force: :cascade do |t|
    t.bigint "job_id", null: false
    t.string "queue_name", null: false
    t.integer "priority", default: 0, null: false
    t.datetime "created_at", null: false
    t.index ["job_id"], name: "index_solid_queue_ready_executions_on_job_id", unique: true
    t.index ["priority", "job_id"], name: "index_solid_queue_poll_all"
    t.index ["queue_name", "priority", "job_id"], name: "index_solid_queue_poll_by_queue"
  end

  create_table "solid_queue_recurring_executions", force: :cascade do |t|
    t.bigint "job_id", null: false
    t.string "task_key", null: false
    t.datetime "run_at", null: false
    t.datetime "created_at", null: false
    t.index ["job_id"], name: "index_solid_queue_recurring_executions_on_job_id", unique: true
    t.index ["task_key", "run_at"], name: "index_solid_queue_recurring_executions_on_task_key_and_run_at", unique: true
  end

  create_table "solid_queue_recurring_tasks", force: :cascade do |t|
    t.string "key", null: false
    t.string "schedule", null: false
    t.string "command", limit: 2048
    t.string "class_name"
    t.text "arguments"
    t.string "queue_name"
    t.integer "priority", default: 0
    t.boolean "static", default: true, null: false
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["key"], name: "index_solid_queue_recurring_tasks_on_key", unique: true
    t.index ["static"], name: "index_solid_queue_recurring_tasks_on_static"
  end

  create_table "solid_queue_scheduled_executions", force: :cascade do |t|
    t.bigint "job_id", null: false
    t.string "queue_name", null: false
    t.integer "priority", default: 0, null: false
    t.datetime "scheduled_at", null: false
    t.datetime "created_at", null: false
    t.index ["job_id"], name: "index_solid_queue_scheduled_executions_on_job_id", unique: true
    t.index ["scheduled_at", "priority", "job_id"], name: "index_solid_queue_dispatch_all"
  end

  create_table "solid_queue_semaphores", force: :cascade do |t|
    t.string "key", null: false
    t.integer "value", default: 1, null: false
    t.datetime "expires_at", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["expires_at"], name: "index_solid_queue_semaphores_on_expires_at"
    t.index ["key", "value"], name: "index_solid_queue_semaphores_on_key_and_value"
    t.index ["key"], name: "index_solid_queue_semaphores_on_key", unique: true
  end

  create_table "store_users", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "store_id", null: false
    t.integer "role", default: 0, null: false
    t.boolean "is_default", default: false, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["store_id"], name: "index_store_users_on_store_id"
    t.index ["user_id"], name: "index_store_users_on_user_id"
  end

  create_table "stores", force: :cascade do |t|
    t.string "name", null: false
    t.text "description"
    t.string "location"
    t.bigint "owner_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "stripe_account_id"
    t.boolean "charges_enabled", default: false, null: false
    t.boolean "details_submitted", default: false, null: false
    t.integer "combined_reviews_count", default: 0, null: false
    t.decimal "overall_average_rating", precision: 4, scale: 2, default: "0.0", null: false
    t.index ["owner_id"], name: "index_stores_on_owner_id"
    t.index ["stripe_account_id"], name: "index_stores_on_stripe_account_id", unique: true
  end

  create_table "timbers", force: :cascade do |t|
    t.string "species", null: false
    t.decimal "thickness_in_inches", precision: 6, scale: 2, null: false
    t.decimal "width_in_inches", precision: 6, scale: 2, null: false
    t.integer "length_in_feet", null: false
    t.string "nominal_dimension", null: false
    t.decimal "board_feet", precision: 8, scale: 2
    t.string "grading_standard"
    t.integer "heart_content_type", default: 0, null: false
    t.integer "surface_finish_type", default: 0, null: false
    t.integer "moisture_condition", default: 0, null: false
    t.string "preservative_treatment"
    t.string "end_cut_style"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["board_feet"], name: "index_timbers_on_board_feet"
    t.index ["end_cut_style"], name: "index_timbers_on_end_cut_style"
    t.index ["heart_content_type"], name: "index_timbers_on_heart_content_type"
    t.index ["length_in_feet"], name: "index_timbers_on_length_in_feet"
    t.index ["moisture_condition"], name: "index_timbers_on_moisture_condition"
    t.index ["nominal_dimension"], name: "index_timbers_on_nominal_dimension"
    t.index ["preservative_treatment"], name: "index_timbers_on_preservative_treatment"
    t.index ["species"], name: "index_timbers_on_species"
    t.index ["surface_finish_type"], name: "index_timbers_on_surface_finish_type"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.string "first_name"
    t.string "last_name"
    t.boolean "admin", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "quotes_awaiting_action_count", default: 0, null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  create_table "veneer_figures", id: false, force: :cascade do |t|
    t.bigint "veneer_id", null: false
    t.bigint "figure_type_id", null: false
    t.index ["figure_type_id"], name: "index_veneer_figures_on_figure_type_id"
    t.index ["veneer_id", "figure_type_id"], name: "index_figure_types_veneers_on_veneer_and_figure_type", unique: true
    t.index ["veneer_id"], name: "index_veneer_figures_on_veneer_id"
  end

  create_table "veneers", force: :cascade do |t|
    t.string "species", null: false
    t.string "veneer_type", default: "raw_flitch", null: false
    t.string "cut_style", default: "plain_sliced", null: false
    t.decimal "thickness_value", precision: 10, scale: 4, null: false
    t.string "thickness_unit", null: false
    t.decimal "length_in_inches", precision: 10, scale: 4
    t.decimal "width_in_inches", precision: 10, scale: 4
    t.decimal "total_square_feet", precision: 10, scale: 4
    t.string "match_type", default: "book_match"
    t.integer "leaf_count"
    t.boolean "sequenced", default: false
    t.string "flitch_identifier"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["cut_style"], name: "index_veneers_on_cut_style"
    t.index ["leaf_count"], name: "index_veneers_on_leaf_count"
    t.index ["match_type"], name: "index_veneers_on_match_type"
    t.index ["thickness_unit"], name: "index_veneers_on_thickness_unit"
    t.index ["total_square_feet"], name: "index_veneers_on_total_square_feet"
    t.index ["veneer_type"], name: "index_veneers_on_veneer_type"
  end

  create_table "wood_block_figures", force: :cascade do |t|
    t.bigint "wood_block_id", null: false
    t.bigint "figure_type_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["figure_type_id"], name: "index_wood_block_figures_on_figure_type_id"
    t.index ["wood_block_id", "figure_type_id"], name: "index_wood_block_figures_on_wood_block_id_and_figure_type_id", unique: true
    t.index ["wood_block_id"], name: "index_wood_block_figures_on_wood_block_id"
  end

  create_table "wood_blocks", force: :cascade do |t|
    t.string "species", null: false
    t.decimal "thickness_in_inches", precision: 6, scale: 2
    t.decimal "width_in_inches", precision: 6, scale: 2
    t.decimal "length_in_inches", precision: 6, scale: 2
    t.decimal "cubic_inches", precision: 8, scale: 2
    t.integer "shape", default: 0
    t.boolean "wax_sealed", default: false
    t.decimal "moisture_content_percent", precision: 5, scale: 2
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "is_reclaimed", default: false, null: false
    t.boolean "is_carving_suitable", default: false, null: false
    t.integer "grain_orientation"
    t.string "ideal_application"
    t.decimal "board_feet", precision: 8, scale: 2
    t.index ["cubic_inches"], name: "index_wood_blocks_on_cubic_inches"
    t.index ["grain_orientation"], name: "index_wood_blocks_on_grain_orientation"
    t.index ["is_carving_suitable"], name: "index_wood_blocks_on_is_carving_suitable"
    t.index ["is_reclaimed"], name: "index_wood_blocks_on_is_reclaimed"
    t.index ["length_in_inches"], name: "index_wood_blocks_on_length_in_inches"
    t.index ["moisture_content_percent"], name: "index_wood_blocks_on_moisture_content_percent"
    t.index ["shape"], name: "index_wood_blocks_on_shape"
    t.index ["species"], name: "index_wood_blocks_on_species"
    t.index ["thickness_in_inches"], name: "index_wood_blocks_on_thickness_in_inches"
    t.index ["wax_sealed"], name: "index_wood_blocks_on_wax_sealed"
    t.index ["width_in_inches"], name: "index_wood_blocks_on_width_in_inches"
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "bids", "products"
  add_foreign_key "bids", "stores", column: "seller_id"
  add_foreign_key "bids", "users", column: "buyer_id"
  add_foreign_key "cart_items", "carts"
  add_foreign_key "cart_items", "products"
  add_foreign_key "cart_items", "quote_requests"
  add_foreign_key "cart_items", "shipping_options"
  add_foreign_key "cart_items", "stores"
  add_foreign_key "carts", "users"
  add_foreign_key "order_items", "orders"
  add_foreign_key "order_items", "products"
  add_foreign_key "order_items", "quote_requests"
  add_foreign_key "order_items", "shipping_options"
  add_foreign_key "order_items", "stores"
  add_foreign_key "orders", "users"
  add_foreign_key "products", "stores"
  add_foreign_key "quote_requests", "products"
  add_foreign_key "quote_requests", "quote_requests", column: "parent_quote_request_id"
  add_foreign_key "quote_requests", "stores", column: "seller_id"
  add_foreign_key "quote_requests", "users", column: "buyer_id"
  add_foreign_key "quotes", "quote_requests"
  add_foreign_key "reviews", "users"
  add_foreign_key "shipping_options", "products"
  add_foreign_key "solid_queue_blocked_executions", "solid_queue_jobs", column: "job_id", on_delete: :cascade
  add_foreign_key "solid_queue_claimed_executions", "solid_queue_jobs", column: "job_id", on_delete: :cascade
  add_foreign_key "solid_queue_failed_executions", "solid_queue_jobs", column: "job_id", on_delete: :cascade
  add_foreign_key "solid_queue_ready_executions", "solid_queue_jobs", column: "job_id", on_delete: :cascade
  add_foreign_key "solid_queue_recurring_executions", "solid_queue_jobs", column: "job_id", on_delete: :cascade
  add_foreign_key "solid_queue_scheduled_executions", "solid_queue_jobs", column: "job_id", on_delete: :cascade
  add_foreign_key "store_users", "stores"
  add_foreign_key "store_users", "users"
  add_foreign_key "stores", "users", column: "owner_id"
  add_foreign_key "veneer_figures", "figure_types"
  add_foreign_key "veneer_figures", "veneers"
  add_foreign_key "wood_block_figures", "figure_types"
  add_foreign_key "wood_block_figures", "wood_blocks"
end
