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

ActiveRecord::Schema[8.0].define(version: 2025_12_05_103119) do
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
    t.decimal "length", precision: 10, scale: 2, null: false
    t.decimal "diameter", precision: 10, scale: 2, null: false
    t.decimal "weight", precision: 10, scale: 2
    t.string "origin"
    t.integer "moisture_content"
    t.integer "grade"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
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
    t.integer "status", default: 0, null: false
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

  create_table "rough_lumbers", force: :cascade do |t|
    t.string "species", null: false
    t.decimal "moisture_content_percent", precision: 5, scale: 2
    t.decimal "nominal_thickness_inches", precision: 6, scale: 2
    t.decimal "nominal_width_inches", precision: 6, scale: 2
    t.integer "length_in_feet"
    t.decimal "board_feet", precision: 8, scale: 2
    t.string "grade"
    t.boolean "can_be_straight_lined"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["board_feet"], name: "index_rough_lumbers_on_board_feet"
    t.index ["can_be_straight_lined"], name: "index_rough_lumbers_on_can_be_straight_lined"
    t.index ["grade"], name: "index_rough_lumbers_on_grade"
    t.index ["length_in_feet"], name: "index_rough_lumbers_on_length_in_feet"
    t.index ["moisture_content_percent"], name: "index_rough_lumbers_on_moisture_content_percent"
    t.index ["nominal_thickness_inches"], name: "index_rough_lumbers_on_nominal_thickness_inches"
    t.index ["nominal_width_inches"], name: "index_rough_lumbers_on_nominal_width_inches"
    t.index ["species"], name: "index_rough_lumbers_on_species"
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
    t.decimal "width", precision: 10, scale: 2, null: false
    t.decimal "length", precision: 10, scale: 2, null: false
    t.decimal "height", precision: 10, scale: 2, null: false
    t.decimal "weight", precision: 10, scale: 2
    t.boolean "dried", default: false, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
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

  create_table "surfaced_lumbers", force: :cascade do |t|
    t.string "species", null: false
    t.decimal "moisture_content_percent", precision: 5, scale: 2
    t.string "nominal_dimension"
    t.decimal "thickness_in_inches", precision: 6, scale: 2
    t.decimal "width_in_inches", precision: 6, scale: 2
    t.integer "length_in_feet"
    t.string "profile"
    t.string "treatment"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["length_in_feet"], name: "index_surfaced_lumbers_on_length_in_feet"
    t.index ["moisture_content_percent"], name: "index_surfaced_lumbers_on_moisture_content_percent"
    t.index ["nominal_dimension"], name: "index_surfaced_lumbers_on_nominal_dimension"
    t.index ["profile"], name: "index_surfaced_lumbers_on_profile"
    t.index ["species"], name: "index_surfaced_lumbers_on_species"
    t.index ["thickness_in_inches"], name: "index_surfaced_lumbers_on_thickness_in_inches"
    t.index ["treatment"], name: "index_surfaced_lumbers_on_treatment"
    t.index ["width_in_inches"], name: "index_surfaced_lumbers_on_width_in_inches"
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
  add_foreign_key "store_users", "stores"
  add_foreign_key "store_users", "users"
  add_foreign_key "stores", "users", column: "owner_id"
  add_foreign_key "wood_block_figures", "figure_types"
  add_foreign_key "wood_block_figures", "wood_blocks"
end
