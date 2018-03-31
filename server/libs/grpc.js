/*
 * Copyright (C) Reflen Inc.
 *
 * This file is part of engine. The codes can not be copied and/or distributed without permission
 *
 * @Author: homer
 * @Email: homer@convospot.io
 * @Date:   2017-11-12 11:19:45
 * @Last Modified by:   Homer
 * @Last Modified time: 2018-01-04 09:25:27
 */

const grpc = require('grpc');
const config = require('../config/env');
const messages = require('../grpc/engine/input_pb');
const services = require('../grpc/engine/input_grpc_pb');

const client = new services.CommandsClient(config.GRPC_CONN, grpc.credentials.createInsecure());

module.exports = {
   client: client,
   messages: messages
}